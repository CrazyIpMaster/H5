import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PatternSelector } from './PatternSelector'

describe('PatternSelector 组件', () => {
  const defaultProps = {
    selectedPattern: null,
    onSelect: vi.fn(),
    onNext: vi.fn(),
    onBack: vi.fn()
  }

  it('应该渲染标题', () => {
    render(<PatternSelector {...defaultProps} />)
    expect(screen.getByText('选择纹样')).toBeInTheDocument()
  })

  it('应该渲染所有纹样', () => {
    render(<PatternSelector {...defaultProps} />)
    
    expect(screen.getByText('仙鹤')).toBeInTheDocument()
    expect(screen.getByText('鸾凤')).toBeInTheDocument()
    expect(screen.getByText('蟒龙')).toBeInTheDocument()
    expect(screen.getByText('麒麟')).toBeInTheDocument()
    expect(screen.getByText('海水江崖')).toBeInTheDocument()
  })

  it('点击纹样应该调用 onSelect', () => {
    const onSelect = vi.fn()
    render(<PatternSelector {...defaultProps} onSelect={onSelect} />)
    
    const craneCard = screen.getByText('仙鹤').closest('button')
    if (craneCard) {
      fireEvent.click(craneCard)
      expect(onSelect).toHaveBeenCalledWith('crane')
    }
  })

  it('未选择纹样时下一步按钮应该禁用', () => {
    render(<PatternSelector {...defaultProps} />)
    
    const nextButton = screen.getByText('下一步')
    expect(nextButton).toHaveClass('opacity-50')
    expect(nextButton).toHaveClass('cursor-not-allowed')
  })

  it('选择纹样后下一步按钮应该可用', () => {
    render(<PatternSelector {...defaultProps} selectedPattern="crane" />)
    
    const nextButton = screen.getByText('下一步')
    expect(nextButton).not.toHaveClass('opacity-50')
  })

  it('点击返回应该调用 onBack', () => {
    const onBack = vi.fn()
    render(<PatternSelector {...defaultProps} onBack={onBack} />)
    
    const backButton = screen.getByText('返回')
    fireEvent.click(backButton)
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('点击下一步应该调用 onNext', () => {
    const onNext = vi.fn()
    render(<PatternSelector {...defaultProps} selectedPattern="crane" onNext={onNext} />)
    
    const nextButton = screen.getByText('下一步')
    fireEvent.click(nextButton)
    expect(onNext).toHaveBeenCalledTimes(1)
  })
})

