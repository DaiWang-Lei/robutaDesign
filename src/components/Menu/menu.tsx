import React, { createContext, FunctionComponentElement, useState } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem'
type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: number) => void;
export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}
// 1.引入context，
// 2.创建context
// 要给MenuItem子组件用，创建一个context
export const MenuContext = createContext<IMenuContext>({ index: 0 })
const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, children, mode, style, onSelect } = props;
  // 3.指明现在的active是那个
  const [curActive, setActive] = useState(defaultIndex)
  const classes = classNames('robuta-menu', className, {
    'menu-vertical': mode === 'vertical'
  })
  // 5.
  const handleClick = (index: number) => {
    // 点击后变化active
    setActive(index);

    onSelect && onSelect(index)
  }
  // 4.透传给子组件的数据
  const passedContext: IMenuContext = {
    index: curActive ? curActive : 0,
    onSelect: handleClick
  }

  // 6.使用React.Children.map来避免直接使用children.map造成的问题
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, { index });
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
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu;