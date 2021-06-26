import classNames from "classnames";
import React from "react";
export enum ButtonSize {
  noraml = 'normal',
  Large = 'lg',
  Small = 'sm'
}

// 枚举写法
// export enum ButtonType {
//   Link = 'link',
//   Primary = 'primary',
//   Default = 'default',
//   Danger = 'danger'
// }

export type ButtonType = 'link' | 'primary' | 'default' | 'danger'
interface IBaseButtonProps {
  className?: string;
  size?: ButtonSize;
  btnType?: ButtonType;
  disabled?: boolean;
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

type NativeButtonProps = IBaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
type AnchorButtonProps = IBaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
// 将所有属性变为可选的Partial<>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
const Button: React.FC<ButtonProps> = (props) => {

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