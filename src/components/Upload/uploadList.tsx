import React, { ChangeEvent, FC, MouseEvent } from 'react';
import { UploadFile } from './upload';
import Icon from '../Icon/icon';
export interface UploadListProps {
  /** 点击删除的回调 */
  onRemove: (file: UploadFile) => void;
  /** 文件列表 */
  uploadFileList: UploadFile[];
}

export const UploadList: FC<UploadListProps> = (props) => {
  const { uploadFileList, onRemove } = props;

  return (
    <ul>
      {uploadFileList.map(file => {
        return (
          <li className='upload-list-item' key={file.uid}>
            <span>
              <Icon icon='file-alt' theme='secondary' />
              <p>{file.name}</p>
            </span>
            <span className='file-status'>
              {file.status === 'uploading' ?
                <Icon icon='spinner' spin theme='primary' /> : file.status === 'error' ?
                  <Icon icon='times-circle' theme='danger' /> : <Icon icon='check-circle' theme='success' />
              }
            </span>
            <span className='file-actions'>
              <Icon icon='trash-alt' onClick={() => { onRemove(file) }} />
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export default UploadList;