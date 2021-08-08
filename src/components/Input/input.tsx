import React, { InputHTMLAttributes, ReactElement, ChangeEvent } from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

// 使用Omit忽略掉和Input冲突的属性
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /** 设置 Input 禁用 */
  disabled?: boolean;
  /** 设置 Input 大小，支持 lg 或者 sm */
  size?: 'lg' | 'sm';
  /** 设置 Input 图标，在左侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /** 设置 Input 前缀，用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /** 设置 Input 后缀，用于配置一些固定组合 */
  append?: string | ReactElement;
  /** 设置 Input 自定义类名 */
  classname?: string;
  /** */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}


/**
 * ## Input 输入框
 * 通过鼠标或键盘输入内容，是最基础的表单域元素
 * ### 何时使用
 *  - 需要用户输入表单域内容时。
 *  - 提供组合型输入框，还可以进行大小选择。
 *  
 * ~~~js
 * //这样引用
 * inport { Input } from 'robutadesign'
 * ~~~
 * 支持所有的HTMLinput的基本属性
 *
 */
export const Input: React.FC<InputProps> = (props) => {
  const { className, disabled, size, icon, prepend, style, append, ...restProps } = props;
  const classes = classNames('input-wrapper', className,
    {
      [`input-size-${size}`]: size,
      'is-disabled': disabled,
      'input-group': prepend || append,
      'input-group-append': !!append,
      'input-group-prepend': !!prepend
    }
  )
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value;
  }


  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }
  return (
    <div className={classes} style={style}>
      {prepend && <div className="input-group-prepend">{prepend}</div>}
      {icon && <div className='icon-wrapper'><Icon icon={icon} title={`title-${icon}`} /></div>}
      <input type="text" className='input-inner' disabled={disabled} {...restProps} />
      {append && <div className="input-group-append">{append}</div>}
    </div>
  )
}

export default Input;