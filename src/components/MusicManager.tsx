import { useEffect, useRef } from 'react'
import { useAppStore } from '../store/useAppStore'

// Assets
import introMusic from '../assets/images/level3_exploration/通用/其余界面背景音乐.mp3?url'
// Replaced heavy WAV (50MB+) with lighter m4a (3.8MB) for mobile performance
import generalMusic from '../assets/images/level1_intro/首页/长图/古风温馨春华秋实 古风舒缓繁华盛茂_爱给网_aigei_com(1).m4a?url'

export function MusicManager() {
  const { currentPhase, introView, isMuted } = useAppStore()
  
  const introAudioRef = useRef<HTMLAudioElement | null>(null)
  const generalAudioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize Audio Objects
  useEffect(() => {
    introAudioRef.current = new Audio(introMusic)
    introAudioRef.current.loop = true
    introAudioRef.current.volume = 0.8 // 80% volume
    
    generalAudioRef.current = new Audio(generalMusic)
    generalAudioRef.current.loop = true
    generalAudioRef.current.volume = 0.8 // 80% volume

    return () => {
      introAudioRef.current?.pause()
      generalAudioRef.current?.pause()
    }
  }, [])

  // Handle Playback Logic
  useEffect(() => {
    const introAudio = introAudioRef.current
    const generalAudio = generalAudioRef.current

    if (!introAudio || !generalAudio) return

    // Global Mute Handler
    if (isMuted) {
      introAudio.pause()
      generalAudio.pause()
      return
    }

    // Determine which track should play
    const shouldPlayIntro = currentPhase === 'intro' && introView === 'story'
    const shouldPlayGeneral = currentPhase !== 'intro'

    // Intro Music Logic
    if (shouldPlayIntro) {
      generalAudio.pause()
      // Reset if it wasn't playing? Or just play.
      // We want to avoid restarting if it's already playing.
      if (introAudio.paused) {
        introAudio.currentTime = 0 // Restart intro music each time story starts
        introAudio.play().catch(e => console.log('Audio playback failed:', e))
      }
    } else {
      introAudio.pause()
    }

    // General Music Logic
    if (shouldPlayGeneral) {
      if (generalAudio.paused) {
        generalAudio.play().catch(e => console.log('Audio playback failed:', e))
      }
    } else {
      generalAudio.pause()
    }

  }, [currentPhase, introView, isMuted])

  return null // Headless component
}
