
import { create } from 'zustand';
import type { EditorState, EditorLayer } from '../types/editor';
import { historyDB } from '../utils/history/indexedDB';

interface EditorStore {
  state: EditorState;
  
  // History
  undoStack: number[];
  redoStack: number[];
  isSaving: boolean;
  
  // Actions
  initialize: (width: number, height: number, initialLayers?: EditorLayer[]) => Promise<void>;
  updateState: (newState: Partial<EditorState>) => void;
  addLayer: (layer: EditorLayer) => void;
  updateLayer: (id: string, updates: Partial<EditorLayer>) => void;
  removeLayer: (id: string) => void;
  reorderLayers: (startIndex: number, endIndex: number) => void;
  selectLayer: (id: string | null, multi?: boolean) => void;
  
  // History Actions
  pushHistory: () => Promise<void>;
  undo: () => Promise<void>;
  redo: () => Promise<void>;
  reset: () => Promise<void>;
}

const initialState: EditorState = {
  canvasWidth: 800,
  canvasHeight: 1200,
  backgroundColor: '#ffffff',
  layers: [],
  selectedLayerIds: []
};

export const useEditorStore = create<EditorStore>((set, get) => ({
  state: initialState,
  undoStack: [],
  redoStack: [],
  isSaving: false,

  initialize: async (width, height, initialLayers = []) => {
    // Try to load last state or init new
    await historyDB.init();
    await historyDB.clear(); // For this session, we start fresh, or we could implement restore
    
    set({
      state: { ...initialState, canvasWidth: width, canvasHeight: height, layers: initialLayers },
      undoStack: [],
      redoStack: []
    });
    
    // Push initial state
    await get().pushHistory();
  },

  updateState: (newState) => {
    set((store) => ({
      state: { ...store.state, ...newState }
    }));
  },

  addLayer: (layer) => {
    set((store) => {
      const newLayers = [...store.state.layers, layer];
      return {
        state: { ...store.state, layers: newLayers, selectedLayerIds: [layer.id] }
      };
    });
    get().pushHistory();
  },

  updateLayer: (id, updates) => {
    set((store) => ({
      state: {
        ...store.state,
        layers: store.state.layers.map(l => l.id === id ? { ...l, ...updates } : l)
      }
    }));
    // Note: We might want to debounce pushHistory for continuous updates like dragging
  },

  removeLayer: (id) => {
    set((store) => ({
      state: {
        ...store.state,
        layers: store.state.layers.filter(l => l.id !== id),
        selectedLayerIds: store.state.selectedLayerIds.filter(sid => sid !== id)
      }
    }));
    get().pushHistory();
  },

  reorderLayers: (startIndex, endIndex) => {
    set((store) => {
      const newLayers = [...store.state.layers];
      const [removed] = newLayers.splice(startIndex, 1);
      newLayers.splice(endIndex, 0, removed);
      return {
        state: { ...store.state, layers: newLayers }
      };
    });
    get().pushHistory();
  },

  selectLayer: (id, multi = false) => {
    set((store) => {
      if (!id) return { state: { ...store.state, selectedLayerIds: [] } };
      
      const currentSelected = store.state.selectedLayerIds;
      let newSelected: string[];
      
      if (multi) {
        if (currentSelected.includes(id)) {
          newSelected = currentSelected.filter(sid => sid !== id);
        } else {
          newSelected = [...currentSelected, id];
        }
      } else {
        newSelected = [id];
      }
      
      return { state: { ...store.state, selectedLayerIds: newSelected } };
    });
  },

  pushHistory: async () => {
    const { state, undoStack } = get();
    set({ isSaving: true });
    
    try {
      const id = await historyDB.addEntry(state);
      
      // Limit stack size to 20
      let newUndoStack = [...undoStack, id];
      if (newUndoStack.length > 20) {
        newUndoStack = newUndoStack.slice(newUndoStack.length - 20);
      }

      set({ 
        undoStack: newUndoStack,
        redoStack: [], // Clear redo on new action
        isSaving: false 
      });
    } catch (error) {
      console.error('Failed to save history:', error);
      set({ isSaving: false });
    }
  },

  undo: async () => {
    const { undoStack, redoStack } = get();
    if (undoStack.length <= 1) return; // Need at least one state

    const currentId = undoStack[undoStack.length - 1];
    const prevId = undoStack[undoStack.length - 2];
    
    try {
      const entry = await historyDB.getEntry(prevId);
      if (entry) {
        set({ 
          state: entry.state,
          undoStack: undoStack.slice(0, -1),
          redoStack: [currentId, ...redoStack]
        });
      }
    } catch (error) {
      console.error('Undo failed:', error);
    }
  },

  redo: async () => {
    const { undoStack, redoStack } = get();
    if (redoStack.length === 0) return;

    const nextId = redoStack[0];
    
    try {
      const entry = await historyDB.getEntry(nextId);
      if (entry) {
        set({ 
          state: entry.state,
          undoStack: [...undoStack, nextId],
          redoStack: redoStack.slice(1)
        });
      }
    } catch (error) {
      console.error('Redo failed:', error);
    }
  },
  
  reset: async () => {
      await historyDB.clear();
      set({
          state: initialState,
          undoStack: [],
          redoStack: []
      });
  }
}));
