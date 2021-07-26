import React, { ChangeEvent, FC, useRef } from 'react';
import axios from 'axios';
import Button from '../Button/button';

export interface UploadProps {
  /** 上传的目的地址 */
  action: string;
  /** 上传的进度 */
  onProgress?: (percentage: number, file: File) => void;
  /** 上传成功的回调 */
  onSuccess?: (data: any, file: File) => void;
  /** 上传失败的回调 */
  onError?: (err: any, file: File) => void;
  /** 上传之前的回调 */
  beforeUpload?: (file: File) => boolean | Promise<File>
  /** 选择文件后的回调 */
  onChange?: (file: File) => void;
}

export const Upload: FC<UploadProps> = (props) => {
  const { action, onProgress, onSuccess, onError, onChange, beforeUpload, ...restProps } = props;
  const fileInputRef = useRef<HTMLInputElement>(null)
  /**点击上传文件按钮 */
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  /** 选择文件 */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  /** 上传文件 */
  const uploadFiles = async (files: FileList) => {
    const postFile = Array.from(files)
    postFile.forEach(file => {
      /** 增加生命周期 */
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then(processFile => post(processFile))
        } else if (result !== false) {
          post(file)
        }
      }
    });
  }

  /** 具体的上传方法 */
  const post = (file: File) => {
    const formData = new FormData()
    formData.append(file.name, file)
    axios.post(action, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      // axios的上传进度
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (percentage < 100) {
          onProgress && onProgress(percentage, file)
        }
      }
    }).then((res) => {
      onSuccess && onSuccess(res, file)
      onChange && onChange(file)
    }).catch((err) => {
      onError && onError(err, file)
      onChange && onChange(file)
    })
  }
  return (
    <div className='upload-component'>
      <Button btnType='primary' onClick={handleClick}>点击上传</Button>
      <input type="file" name="MyFile" style={{ display: 'none' }} ref={fileInputRef} className='file-input' onChange={handleFileChange} />
    </div>
  )
}

export default Upload;