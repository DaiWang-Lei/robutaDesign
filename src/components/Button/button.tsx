import React,{FC,ButtonHTMLAttributes,AnchorHTMLAttributes,ReactNode} from "react";
import classNames from "classnames";
// export enum ButtonSize {
//   noraml = 'normal',
//   Large = 'lg',
//   Small = 'sm'
// }
export type ButtonSize = 'normal' | 'lg' | 'sm'
// 枚举写法
// export enum ButtonType {
//   Link = 'link',
//   Primary = 'primary',
//   Default = 'default',
//   Danger = 'danger'
// }

export type ButtonType = 'link' | 'primary' | 'default' | 'danger'
interface IBaseButtonProps {
  /** 自定义类名 */
  className?: string;
  /** 按钮的大小 */
  size?: ButtonSize;
  /** 按钮的类型 */
  btnType?: ButtonType;
  /** 按钮的禁用 */
  disabled?: boolean;
  /** Link的超链接地址 */
  href?: string;
  children: ReactNode;
  /** 按钮的点击事件 */
  onClick?: () => void;
}

type NativeButtonProps = IBaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
type AnchorButtonProps = IBaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>
// 将所有属性变为可选的Partial<>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from 'vikingship-ui'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {

  const {
    size,
    href,
    disabled,
    btnType,
    children,
    className,
    ...restProps
  } = props;

  const classes = classNames('btn', className,
    {
      [`btn-${size}`]: size,
      [`btn-${btnType}`]: btnType,
      'disabled': (btnType === 'link') && disabled
    }
  )
  if (btnType === 'link' && href) {
    return (
      <a
        href={href}
        className={classes}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }

}

// 给Button设置默认属性

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
}

export default Button;