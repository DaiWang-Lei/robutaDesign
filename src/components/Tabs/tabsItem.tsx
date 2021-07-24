import React, { Children, FC } from 'react';
import classNames from 'classnames';

export interface TabsItemProps {
  /** Tab选项上的文字 */
  label: any;
  /** 自定义的className */
  className?: string;
  /** tab选项是否被激活 */
  isActive?: boolean;
  /** tab选项是否被禁用 */
  disabled?: boolean;
}

export const TabsItem: FC<TabsItemProps> = (props) => {
  const { className, label, isActive, disabled, children, ...restProps } = props;
  const classes = classNames('tabs-content', className, {
    'tabs-content-active': isActive
  })
  return (
    <div key={label} className={classes}>
      {children}
    </div>
  )
}
TabsItem.defaultProps = {
  disabled: false,
  isActive: false
}



export default TabsItem;