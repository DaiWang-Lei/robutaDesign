import React, { useContext } from 'react';
import classNames from 'classnames';
// 1.引入创建的context
import { MenuContext } from './menu';

export interface MenuItemProps {
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  index?: string;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, children, style } = props;
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })
  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === 'string') {
      context.onSelect(index)
    }
  }
  return (
    <li
      className={classes}
      style={style}
      onClick={handleClick}
    >
      {children}
    </li>
  )

}
MenuItem.displayName = 'MenuItem'

export default MenuItem;