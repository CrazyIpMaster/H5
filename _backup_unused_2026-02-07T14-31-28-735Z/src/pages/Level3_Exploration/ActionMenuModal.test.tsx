/**
 * @vitest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ActionMenuModal } from './ActionMenuModal'
import html2canvas from 'html2canvas'

// Mock html2canvas
vi.mock('html2canvas', () => ({
  default: vi.fn(() => Promise.resolve({
    toDataURL: () => 'data:image/png;base64,fake-data'
  }))
}))

// Mock window.alert
window.alert = vi.fn()

describe('ActionMenuModal', () => {
  const onClose = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders nothing when closed', () => {
    render(<ActionMenuModal isOpen={false} onClose={onClose} />)
    expect(screen.queryByAltText('更多拓展')).toBeNull()
  })

  it('renders buttons when open', () => {
    render(<ActionMenuModal isOpen={true} onClose={onClose} />)
    expect(screen.getByAltText('更多拓展')).toBeDefined()
    expect(screen.getByAltText('生成海报')).toBeDefined()
  })

  it('calls alert on More Expansion click', () => {
    render(<ActionMenuModal isOpen={true} onClose={onClose} />)
    fireEvent.click(screen.getByAltText('更多拓展'))
    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('更多拓展功能'))
  })

  it('calls html2canvas on Generate Poster click', async () => {
    render(<ActionMenuModal isOpen={true} onClose={onClose} />)
    fireEvent.click(screen.getByAltText('生成海报'))
    
    // Wait for the async operation
    await waitFor(() => {
      expect(html2canvas).toHaveBeenCalled()
    })
  })

  it('calls onClose when ESC is pressed', () => {
    render(<ActionMenuModal isOpen={true} onClose={onClose} />)
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })
})
