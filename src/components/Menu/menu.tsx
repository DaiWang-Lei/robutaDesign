import React, { createContext, FunctionComponentElement, useState } from 'react';

import classNames from 'classnames';
import { MenuItemProps } from './menuItem'
type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: string) => void;
export interface MenuProps {
  /** 默认active 的菜单项索引值 */
  defaultIndex?: string;
  /** 自定义类名 */
  className?: string;
  /** 菜单的展示形式 横向或者纵向 */
  mode?: MenuMode;
  /** 设置 菜单 样式 */
  style?: React.CSSProperties;
  /** 点击菜单触发的回调函数 */
  onSelect?: SelectCallback;
  /** 设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];

}
// 1.引入context，
// 2.创建context
// 要给MenuItem子组件用，创建一个context
export const MenuContext = createContext<IMenuContext>({ index: '0' });
/** 
 * ## Menu导航菜单
 * 
 * 给网页提供导航功能的菜单，支持横向和纵向两种模式，支持下拉菜单
 * ### 何时使用
 *  
 * - 导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。
 *  
 * - 更多布局和导航的使用可以参考。
 * 
 * ### 开发者注意事项
 *  
 *  - Menu 元素为 ul，因而仅支持 li 以及 script-supporting 子元素。因而你的子节点元素应该都在 Menu.Item 内使用。
 *  
 *  - Menu 需要计算节点结构，因而其子元素仅支持 Menu.* 以及对此进行封装的 HOC 组件。
 * 
 * ~~~js
 * import { Menu } from 'robutadesign'
 * ~~~
 */
export const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, children, mode, style, onSelect, defaultOpenSubMenus } = props;
  // 3.指明现在的active是那个
  const [curActive, setActive] = useState(defaultIndex)
  const classes = classNames('robuta-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })
  // 5.
  const handleClick = (index: string) => {
    // 点击后变化active
    setActive(index);

    onSelect && onSelect(index)
  }
  // 4.透传给子组件的数据
  const passedContext: IMenuContext = {
    index: curActive ? curActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }

  // 6.使用React.Children.map来避免直接使用children.map造成的问题
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // 向组件增加渲染的额外属性
        return React.cloneElement(childElement, { index: index.toString() });
      } else {
        console.error('Waring: Menu has a child  which is not MenuItem component')
      }
    })
  }
  return (
    <ul
      className={classes}
      style={style}
      data-testid='test-menu'
    >
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>

    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal'
}

export default Menu;