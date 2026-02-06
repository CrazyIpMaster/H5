import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from './Modal'

describe('Modal 组件', () => {
  it('关闭状态时不应该渲染内容', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal 内容</div>
      </Modal>
    )
    
    expect(screen.queryByText('Modal 内容')).not.toBeInTheDocument()
  })

  it('打开状态时应该渲染内容', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal 内容</div>
      </Modal>
    )
    
    expect(screen.getByText('Modal 内容')).toBeInTheDocument()
  })

  it('应该渲染标题', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="测试标题">
        <div>Modal 内容</div>
      </Modal>
    )
    
    expect(screen.getByText('测试标题')).toBeInTheDocument()
  })

  it('点击关闭按钮应该调用 onClose', () => {
    const onClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal 内容</div>
      </Modal>
    )
    
    // 找到关闭按钮（SVG 图标的父按钮）
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)
    
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('点击遮罩层应该调用 onClose', () => {
    const onClose = vi.fn()
    const { container } = render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal 内容</div>
      </Modal>
    )
    
    // 找到遮罩层（第一个 absolute 元素）
    const backdrop = container.querySelector('.backdrop-blur-sm')
    if (backdrop) {
      fireEvent.click(backdrop)
      expect(onClose).toHaveBeenCalledTimes(1)
    }
  })
})

