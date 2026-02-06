
type EventName = 'page_view' | 'click_category' | 'enter_exploration' | 'enter_creation' | 'download_poster' | 'batch_download';

interface AnalyticsEvent {
  name: EventName;
  params?: Record<string, any>;
  timestamp: number;
}

class Analytics {
  private events: AnalyticsEvent[] = [];

  logEvent(name: EventName, params: Record<string, any> = {}) {
    const event: AnalyticsEvent = {
      name,
      params,
      timestamp: Date.now()
    };
    this.events.push(event);
    console.log('[Analytics]', name, params);
    
    // In a real app, send to backend here
    // navigator.sendBeacon('/api/analytics', JSON.stringify(event));
  }

  getEvents() {
    return this.events;
  }
}

export const analytics = new Analytics();
