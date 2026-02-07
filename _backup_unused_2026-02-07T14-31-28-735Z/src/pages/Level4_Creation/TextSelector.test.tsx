import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TextSelector } from './TextSelector'

describe('TextSelector 组件', () => {
  const defaultProps = {
    selectedBlessing: null,
    onSelect: vi.fn(),
    onNext: vi.fn(),
    onBack: vi.fn()
  }

  it('应该渲染标题', () => {
    render(<TextSelector {...defaultProps} />)
    expect(screen.getByText('选择祝福')).toBeInTheDocument()
  })

  it('应该渲染所有祝福语', () => {
    render(<TextSelector {...defaultProps} />)
    
    expect(screen.getByText('马到成功')).toBeInTheDocument()
    expect(screen.getByText('万马迎福')).toBeInTheDocument()
    expect(screen.getByText('龙腾虎跃')).toBeInTheDocument()
    expect(screen.getByText('吉祥如意')).toBeInTheDocument()
  })

  it('点击祝福语应该调用 onSelect', () => {
    const onSelect = vi.fn()
    render(<TextSelector {...defaultProps} onSelect={onSelect} />)
    
    const blessingCard = screen.getByText('马到成功').closest('button')
    if (blessingCard) {
      fireEvent.click(blessingCard)
      expect(onSelect).toHaveBeenCalledWith('madaochenggong')
    }
  })

  it('未选择祝福语时生成按钮应该禁用', () => {
    render(<TextSelector {...defaultProps} />)
    
    const nextButton = screen.getByText('生成海报')
    expect(nextButton).toHaveClass('opacity-50')
    expect(nextButton).toHaveClass('cursor-not-allowed')
  })

  it('选择祝福语后生成按钮应该可用', () => {
    render(<TextSelector {...defaultProps} selectedBlessing="madaochenggong" />)
    
    const nextButton = screen.getByText('生成海报')
    expect(nextButton).not.toHaveClass('opacity-50')
  })

  it('点击返回应该调用 onBack', () => {
    const onBack = vi.fn()
    render(<TextSelector {...defaultProps} onBack={onBack} />)
    
    const backButton = screen.getByText('返回')
    fireEvent.click(backButton)
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('点击生成海报应该调用 onNext', () => {
    const onNext = vi.fn()
    render(<TextSelector {...defaultProps} selectedBlessing="madaochenggong" onNext={onNext} />)
    
    const nextButton = screen.getByText('生成海报')
    fireEvent.click(nextButton)
    expect(onNext).toHaveBeenCalledTimes(1)
  })
})

