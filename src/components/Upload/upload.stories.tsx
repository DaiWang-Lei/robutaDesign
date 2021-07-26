import React from 'react';
import { storiesOf } from '@storybook/react';
import Upload, { UploadFile, UploadProps } from './upload';
import { action } from '@storybook/addon-actions';

const defaultFileList: UploadFile[] = [
  { uid: '123', name: 'One punch Man', size: 3411, status: 'uploading', percent: 20 },
  { uid: '31', name: 'SayiTama', size: 1244, status: 'success', percent: 50 },
  { uid: '13', name: 'Narcotics', size: 3411, status: 'error', percent: 42 },
]

const checkSize = (file: File) => {
  const currentFileSize = Math.round(file.size / 1024)
  if (currentFileSize > 100) {
    alert('文件太大了！请选择小于100k的文件')
    return false;
  }
  return true
}
const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', { type: file.type })
  return Promise.resolve(newFile)
}
const defalutUpload = () => (
  <Upload
    action='http://jsonplaceholder.typicode.com/posts'
    onChange={action('change')}
    defaultFileList={defaultFileList}
  />
)
storiesOf('Upload Component', module)
  .add('Upload', defalutUpload)