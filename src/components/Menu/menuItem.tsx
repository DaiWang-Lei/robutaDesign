import React, { useContext } from 'react';
import classNames from 'classnames';
// 1.引入创建的context
import { MenuContext } from './menu';

export interface MenuItemProps {
  /** 设置 MenuItem 的禁用 */
  disabled?: boolean;
  /** 设置MenuItem 的属性名 */
  className?: string;
  /** 设置MenuItem 的样式 */
  style?: React.CSSProperties;
  /** 设置MenuItem 的索引值 */

  index?: string;
}
/**
 * Menu中只能包含MenuItem
 *
 */
export const MenuItem: React.FC<MenuItemProps> = (props) => {
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