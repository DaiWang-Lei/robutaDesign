import * as React from 'react';
import {  fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './submenu';
jest.mock('../Icon/icon', () => {
  return () => {
    return <i className="fa" />
  }
})
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props: any) => {
      return props.children
    }
  }
})
// 设置默认测试属性
const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

// 设置纵向测试属性
const testVerProps: MenuProps = {
  mode: 'vertical',
  defaultIndex: '0',
  defaultOpenSubMenus: ['4'],
  onSelect: jest.fn()
}

// 用来渲染不同类型的组件
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem >
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem >
        daiwang
      </MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem >
          drop1
        </MenuItem>
      </SubMenu>
      <SubMenu title='dropdowni' >
        <MenuItem >
          open1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}
let wrapper: RenderResult, wrapperv: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement


/*  由于没有CSS样式，所以subMenu一直出现在页面上，导致测试无法进行
    故创建一个css生成函数
*/

const createStyleElement = () => {
  const cssFile: string = `
  .robuta-submenu{
    display:none;
  }
  .robuta-submenu.menu-opened{
    display:block;
  }
  `
  const style = document.createElement('style');
  style.innerHTML = cssFile;
  return style;
}

describe('test Menu and MenuItem conponent in default(horizontal) mode', () => {

  /* case要操作相同的元素
  通用的元素放到beforeEach这个钩子函数中，在每个例子开始之前都会跑 */
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    // 调用container.append将所创建的style标签加到测试用例里
    wrapper.container.append(createStyleElement())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })

  it('should render correct Menu and MenuItem based on default props', () => {
    // 测试Menu
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('robuta-menu test')
    // 没有加subMenu之前
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    // 加了subMenu之后，由于getElementsByTagName不关注层级，所以换一个CSS选择器
    //  增加测试了纵向展开，
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
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
    expect(testProps.onSelect).toHaveBeenCalledWith('2')

    // 测试disabled
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })


  // 测试subMenu
  it('should show dropdown items when hover on subMenu', async () => {
    //queryByText:返回一个HTML元素或者null，因为可能没有subMenu所以这里用queryByText
    // toBeVisible：有没有展现到页面上
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible()
    }, { timeout: 300 })

    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible()
    }, { timeout: 300 })
  })
})

describe('test Menu and MenuItem component in vertical mode', () => {
  //由于调用两次getByTestId,所以在新的调用之前，需要把老的清除掉
  beforeEach(() => {
    wrapperv = render(generateMenu(testVerProps))
    wrapperv.container.append(createStyleElement())
  })
  // 纵向时，有没有渲染出菜单
  it('should render vertical mode when mode is set to vertical', () => {
    const menuElement = wrapperv.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  // 纵向时，有没有渲染出子菜单，点击子菜单，有没有触发事件
  it('should show dropdown items when click on subMenu for vertical', () => {
    expect(wrapperv.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = wrapperv.getByText('dropdown')
    fireEvent.click(dropdownElement)
    expect(wrapperv.queryByText('drop1')).toBeVisible()
    fireEvent.click(wrapperv.getByText('drop1'))    
    expect(testVerProps.onSelect).toHaveBeenCalledWith('3-0')
  })
  // 纵向时，有没有默认展开
  it('shuold show shubMenu dropdown when defaultOpenSubMenus contains subMenu index', () => {
    expect(wrapperv.queryByText('open1')).toBeVisible()
  })
})