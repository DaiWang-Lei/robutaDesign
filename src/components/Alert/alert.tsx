import React, { FC, useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';

export interface AlertProps {
  /**Alert 的文字内容 */
  title: string;
  /** 自定义类名 */
  className?: string;
  /** Alert的类型 */
  type?: 'success' | 'danger' | 'warning' | 'default' | 'primary';
  /** 关闭按钮是否显示 */
  closable?: boolean;
  /** 关闭之后的回调函数 */
  onClose?: () => void;
  /** 警告的提示内容*/
  message?: string;
}

export const Alert: FC<AlertProps> = (props) => {
  const { title, className, type, closable, onClose, message, ...restProps } = props;
  const [visible, setVisible] = useState(true);
  const classes = classNames('alert', className, {
    [`alert-${type}`]: type
  })

  const handleClose = () => {
    setVisible(false)
    onClose && onClose()
  }
  return (
    <Transition in={visible} timeout={300} animation='zoom-in-top' >
      <div className={classes} style={{ margin: '1px', }}>
        {title && <h4 className='alert-title'>{title}</h4>}
        {message && <p className='alert-message'>{message}</p>}
        {closable && <Icon className='alert-icon' icon='times' onClick={handleClose} />}
      </div>
    </Transition >
  )
}

Alert.defaultProps = {
  type: 'primary',
  closable: true
}

export default Alert;