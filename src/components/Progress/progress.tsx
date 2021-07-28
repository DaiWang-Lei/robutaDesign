import React, { CSSProperties, FC } from 'react';
import classNames from 'classnames';
import { theme } from '../Icon/icon'
interface ProgressProps {
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

const Progress: FC<ProgressProps> = (props) => {
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