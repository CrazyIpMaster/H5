import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ErrorMessage } from './ErrorMessage'

describe('ErrorMessage 组件', () => {
  it('应该渲染错误信息', () => {
    render(<ErrorMessage message="测试错误信息" />)
    expect(screen.getByText('测试错误信息')).toBeInTheDocument()
  })

  it('应该在点击关闭按钮时调用 onDismiss', () => {
    const onDismiss = vi.fn()
    render(<ErrorMessage message="测试错误" onDismiss={onDismiss} />)
    
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)
    
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('应该在点击重试按钮时调用 onRetry', () => {
    const onRetry = vi.fn()
    render(<ErrorMessage message="测试错误" onRetry={onRetry} />)
    
    const retryButton = screen.getByText('重新尝试')
    fireEvent.click(retryButton)
    
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('没有 onDismiss 时不应该显示关闭按钮', () => {
    render(<ErrorMessage message="测试错误" />)
    
    // 只有重试按钮时不应该有关闭按钮
    const buttons = screen.queryAllByRole('button')
    expect(buttons.length).toBe(0)
  })

  it('没有 onRetry 时不应该显示重试按钮', () => {
    render(<ErrorMessage message="测试错误" onDismiss={() => {}} />)
    
    expect(screen.queryByText('重新尝试')).not.toBeInTheDocument()
  })
})

