import React, { DragEvent, FC, useState } from 'react';
import classNames from 'classnames';

export interface DragProps {
  onFile: (fiels: FileList) => void;
}

export const Dragger: FC<DragProps> = (props) => {
  const { onFile, children, ...restProps } = props;
  const [dragover, setDragover] = useState(false)
  const classes = classNames('uploader-dragger', {
    'is-dragover': dragover
  })

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragover(false)
    onFile(e.dataTransfer.files)
  }
  const handlerDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragover(over)

  }
  return (
    <div
      className={classes}
      onDrop={handleDrop}
      onDragOver={(e) => handlerDrag(e, true)}
      onDragLeave={(e) => handlerDrag(e, false)}
    >
      {children}
    </div>
  )
}
export default Dragger;