import { useCallback } from 'react'
import { StorySlider } from './StorySlider'
import { HomeEntry } from './HomeEntry'
import { useAppStore } from '../../store/useAppStore'

export function IntroPage() {
  const { introView, setIntroView, setPhase } = useAppStore()

  const handleStartStory = useCallback(() => {
    setIntroView('story')
  }, [setIntroView])

  const handleStoryComplete = useCallback(() => {
    setPhase('hub')
  }, [setPhase])

  return (
    <>
      {introView === 'home' && (
        <HomeEntry onStartStory={handleStartStory} />
      )}

      {introView === 'story' && (
        <StorySlider onComplete={handleStoryComplete} />
      )}
    </>
  )
}
