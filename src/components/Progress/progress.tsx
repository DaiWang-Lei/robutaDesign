import React, { CSSProperties, FC } from 'react';
import classNames from 'classnames';
import { theme } from '../Icon/icon'
export interface ProgressProps {
  /** 当前百分比 */
  percent: number;
  /** 自定义的CSS样式 */
  styles?: CSSProperties;
  /** 是否展示百分比 */
  showText?: boolean;
  /** 主题 */
  them?: theme;
  /** 进度条的高度 */
  strokeHeight?: number;
  /** 自定义类名 */
  className?: string;
}
/** 
 * ## Progress进度条
 * 
 * 展示操作的当前进度。
 * ### 何时使用
 *  
 * 在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。
 *  
 * - 当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过 2 秒时；
 * 
 * - 当需要显示一个操作完成的百分比时。
 * 
 * ~~~js
 * import { Progress } from 'robutadesign'
 * ~~~
 */
export const Progress: FC<ProgressProps> = (props) => {
  const { percent, styles, showText, them, className, strokeHeight, ...restProps } = props;
  const classes = classNames('progress-bar', className)
  return (
    <div className={classes} style={styles}>
      <div className='progress-bar-outer' style={{ height: `${strokeHeight}px` }}>
        <div className={`progress-bar-inner color-${them}`} style={{ width: `${percent}%` }}>
          {showText && <span className='inner-text'>{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  them: 'primary'
}

export default Progress;