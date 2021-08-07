import  React,{ FC } from 'react';
import { UploadFile } from './upload';
import Icon from '../Icon/icon';
import Progress from '../Progress/progress'


export interface UploadListProps {
  /** 点击删除的回调 */
  onRemove: (_file: UploadFile) => void;
  /** 文件列表 */
  uploadFileList: UploadFile[];
}

export const UploadList: FC<UploadListProps> = (props) => {
  const { uploadFileList, onRemove, ...restProps } = props;

  return (
    <ul className='upload-list'>
      {uploadFileList.map(file => {
        return (
          <li className='upload-list-item' key={file.uid}>
            <span className={`file-name file-name-${file.status}`}>
              <Icon icon='file-alt' theme='secondary' />
              {file.name}
            </span>
            <span className='file-status'>
              {file.status === 'uploading' || file.status === 'ready' ?
                <Icon icon='spinner' spin theme='primary' /> : file.status === 'error' ?
                  <Icon icon='times-circle' theme='danger' /> : <Icon icon='check-circle' theme='success' />
              }
            </span>
            <span className='file-actions'>
              <Icon icon='trash-alt' onClick={() => { onRemove(file) }} />
            </span>
            {
              file.status === 'uploading' && <Progress percent={file.percent || 0} />
            }


          </li>

        )
      })}
    </ul>
  )
}

export default UploadList;