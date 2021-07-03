import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type theme = 'primary' | 'danger' | 'dark' | 'warning' | 'secondary' | 'success' | 'info' | 'light'

export interface IconProps extends FontAwesomeIconProps {
  theme?: theme
}

const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...restprops } = props;

  const classes = classNames('robuta-icon', className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} {...restprops} />
  )
}

export default Icon;