import * as React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'

// 设置默认测试属性
const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test'
}

// 设置纵向测试属性
const testVerProps: MenuProps = {
  mode: 'vertical',
  defaultIndex: 0
}

// 用来渲染不同类型的组件
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>
        active
      </MenuItem>
      <MenuItem disabled index={1}>
        disabled
      </MenuItem>
      <MenuItem index={2}>
        daiwang
      </MenuItem>
    </Menu>
  )
}
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement

describe('test Menu and MenuItem conponent', () => {

  // case要操作相同的元素
  // 通用的元素放到beforeEach这个钩子函数中，在每个例子开始之前都会跑
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })

  it('should render correct Menu and MenuItem based on default props', () => {
    // 测试Menu
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('robuta-menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)

    // 测试MenuItem
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')

  })


  // 测试按钮的点击能否触发事件切换active
  it('click items should change active and call the right callback', () => {
    const thirdElement = wrapper.getByText('daiwang')
    fireEvent.click(thirdElement)
    expect(thirdElement).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)

    // 测试disabled
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  it('should render vertical mode when mode is set to vertical', () => {
    //由于调用两次getByTestId,所以在新的调用之前，需要把老的清除掉
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
})