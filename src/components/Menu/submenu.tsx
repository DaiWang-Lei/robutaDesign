import React, { FunctionComponentElement, useContext, useState } from 'react';
import classNames from 'classnames';
import Transition from '../Transition/transition';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon';

import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
export interface SubMenuProps {
  /** 设置subMenu的索引 */
  index?: string;
  /** 设置subMenu的标题 */
  title?: string;
  /** 设置subMenu的className */
  className?: string;
}
export const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, children, className } = props;
  const context = useContext(MenuContext)
  const openSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpend = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false;
  const [menuOpen, setOpen] = useState(isOpend);
  const classes = classNames('menu-item', 'submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'

  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen)
  }

  let timer: any;

  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300);
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}

  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {}
  const renderChildren = () => {
    const subMenuClasses = classNames('robuta-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, { index: `${index}-${i}` });
      } else {
        console.error('warning:SubMenu has a child which is not MenuItem component')
      }
    })
    return (
      <Transition
        in={menuOpen}
        timeout={300}
        animation='zoom-in-top'
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    );
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='submenu-item' {...clickEvents}>
        {title}
        <Icon icon='angle-down' theme='primary' className='arrow-icon' />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu';
export default SubMenu;