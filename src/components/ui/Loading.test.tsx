import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Loading } from './Loading'

describe('Loading 组件', () => {
  it('应该渲染默认加载文字', () => {
    render(<Loading />)
    expect(screen.getByText('加载中...')).toBeInTheDocument()
  })

  it('应该渲染自定义加载文字', () => {
    render(<Loading text="正在生成海报..." />)
    expect(screen.getByText('正在生成海报...')).toBeInTheDocument()
  })

  it('非全屏模式应该有正确的样式', () => {
    const { container } = render(<Loading />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain('flex')
    expect(wrapper.className).not.toContain('fixed')
  })

  it('全屏模式应该有正确的样式', () => {
    const { container } = render(<Loading fullScreen />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain('fixed')
    expect(wrapper.className).toContain('inset-0')
  })
})

