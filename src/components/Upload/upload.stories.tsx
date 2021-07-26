import React from 'react';
import { storiesOf } from '@storybook/react';
import Upload, { UploadProps } from './upload';
import { action } from '@storybook/addon-actions';


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
    beforeUpload={filePromise}
    onChange={action('change')}

  />
)
storiesOf('Upload Component', module)
  .add('Upload', defalutUpload)