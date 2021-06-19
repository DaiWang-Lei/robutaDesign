import classNames from "classnames";
import React from "react";
export enum ButtonSize {
  noraml = 'normal',
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Link = 'Link',
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger'
}

interface IBaseButtonProps {
  className?: string;
  size?: ButtonSize;
  btnType?: ButtonType;
  disabled?: boolean;
  href?: string;
  children: React.ReactNode;
}

const Button: React.FC<IBaseButtonProps> = (props) => {

  const {
    size,
    href,
    disabled,
    btnType,
    children
  } = props;

  const classes = classNames('btn',
    {
      [`btn-${size}`]: size,
      [`btn-${btnType}`]: btnType,
      'disabled': (btnType === ButtonType.Link) && disabled
    }
  )
  if (btnType === ButtonType.Link && href) {
    return (
      <a
        href={href}
        className={classes}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }

}

// 给Button设置默认属性

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
}

export default Button;