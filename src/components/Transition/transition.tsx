import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

/**
 * 动画的方向
 */
type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'
/**
 * 动画的方向
 * 
 */
type TransitonProps = CSSTransitionProps & { animation?: AnimationName; wrapper?: boolean }
export const Transition: React.FC<TransitonProps> = (props) => {
  const { classNames, children, animation, wrapper, ...restProps } = props;
  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {/* 为了给自身有transition动画的做兼容，
          如果目标组件要使用Transition，那么需加上wrapper
          ！！！transition属性不会继承！！！
      */}
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>

  )
}
Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
}

export default Transition