import { useAppStore } from '../../store/useAppStore'
import { BeastExploration } from './BeastExploration'
import { FeiyuExploration } from './FeiyuExploration'
import { PatternExploration } from './PatternExploration'

export function ExplorationPage() {
  const { selectedRoute } = useAppStore()
  
  // Direct render based on route
  if (selectedRoute === 'earth') {
    return <BeastExploration />
  }
  if (selectedRoute === 'sky') {
    return <FeiyuExploration />
  }
  if (selectedRoute === 'water') {
    return <PatternExploration />
  }

  return null
}
