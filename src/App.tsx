import { AnimatePresence, motion } from 'framer-motion'
import { Preloader } from './components/Preloader'
import { MusicManager } from './components/MusicManager'
import { ScaleWrapper } from './components/ScaleWrapper'
import { IntroPage } from './pages/Level1_Intro/IntroPage'
import { HubPage } from './pages/Level2_Hub/HubPage'
import { ExplorationPage } from './pages/Level3_Exploration/ExplorationPage'
import { CreationPage } from './pages/Level4_Creation/CreationPage'
import { ErrorMessage } from './components/ui/ErrorMessage'
import { useAppStore } from './store/useAppStore'

function App() {
  const {
    currentPhase,
    isAppLoaded,
    error,
    setError,
    isMuted,
    toggleMute
  } = useAppStore()

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black text-white font-sans">
      <MusicManager />
      
      {/* Global Music Toggle Button */}
      <motion.button
        className="fixed top-4 left-4 z-[100] w-10 h-10 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full border border-white/20"
        onClick={toggleMute}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isAppLoaded ? 1 : 0 }}
      >
        {isMuted ? (
          // Mute Icon
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="1" y1="1" x2="23" y2="23"></line>
            <path d="M9 9v6a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
          </svg>
        ) : (
          // Music Icon
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
        )}
      </motion.button>
      
      <AnimatePresence>
        {error && (
          <ErrorMessage 
            message={error} 
            onDismiss={() => setError(null)} 
          />
        )}
      </AnimatePresence>

      <ScaleWrapper>
        <AnimatePresence mode="wait">
          {/* Intro Phase - Always rendered initially behind preloader */}
          {currentPhase === 'intro' && (
            <motion.div
              key="intro"
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <IntroPage />
            </motion.div>
          )}

          {currentPhase === 'hub' && (
            <motion.div
              key="hub"
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HubPage />
            </motion.div>
          )}

          {currentPhase === 'exploration' && (
            <motion.div
              key="exploration"
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ExplorationPage />
            </motion.div>
          )}

          {currentPhase === 'creation' && (
            <motion.div
              key="creation"
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CreationPage />
            </motion.div>
          )}
        </AnimatePresence>
      </ScaleWrapper>
      
      {/* Preloader is outside ScaleWrapper to cover full screen */}
      <Preloader />
    </div>
  )
}

export default App
