import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type theme = 'primary' | 'danger' | 'dark' | 'warning' | 'secondary' | 'success' | 'info' | 'light'

export interface IconProps extends FontAwesomeIconProps {
  /** 主题 */
  theme?: theme
}
/**
 * 语义化的矢量图形。
 * 可查询fontawesome 来具体使用
 *  ### 引用方法
 *
 * ~~~js
 * import { Icon } from 'robutadesign'
 * ~~~
 */
export const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...restprops } = props;

  const classes = classNames('robuta-icon', className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} {...restprops} />
  )
}

export default Icon;