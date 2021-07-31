import React, { ChangeEvent, Children, FC, useRef, useState } from 'react';
import axios from 'axios';
import Button from '../Button/button';
import UploadList from './uploadList';
import Dragger from './drag';
export interface UploadFile {
  /** 唯一标识 */
  uid: string;
  /** 文件的名称 */
  name: string;
  /** 文件的大小 */
  size: number;
  /** 文件上传的进度 */
  percent?: number;
  /** 文件上传的状态 */
  status?: 'ready' | 'uploading' | 'success' | 'error';
  /** !当前文件的完整信息 */
  raw?: File;
  /** !请求成功的结果 */
  response?: any;
  /** !请求失败的结果 */
  error?: any;
}

export interface UploadProps {
  /** 默认的文件列表 */
  defaultFileList?: UploadFile[];
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
  /** 点击删除的回调 */
  onRemove?: (file: UploadFile) => void;
  /**自定义Header */
  headers?: { [key: string]: any };
  //添加name属性 - 代表发到后台的文件参数名
  /**文件名 */
  name?: string;
  /**添加data属性 - 上传所需的额外参数 */
  data?: { [key: string]: any };
  /** 请求是否携带参数 */
  withCredentials?: boolean;
  //添加input本身的file约束属性，multiple accept 等 
  //accept 限定约束文件的类型
  /**可接受上传文件的类型 */
  accept?: string;
  /**允许上传多个文件 */
  multiple?: boolean;
  /** 是否拖动上传 */
  drag?: boolean;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    children,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    ...restProps } = props;
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
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
  /** 更新文件列表
   * file：要更新的文件
   * updateObj：要更新的对象
   */
  const updateFileList = (uploadfile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList((prevList) => {
      return prevList.map(file => {
        if (file.uid === uploadfile.uid) {
          return { ...file, ...updateObj }
        }
        return file;
      })
    })
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
    let _file: UploadFile = {
      uid: 'uploadFile_uid_' + Date.now(),
      name: file.name,
      size: file.size,
      status: 'ready',
      raw: file,
    };
    // 将新的文件添加到文件列表
    setFileList([_file, ...fileList])
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    axios.post(action, formData, {
      headers: { 'Content-Type': 'multipart/form-data', ...headers },
      // axios的上传进度
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0
        // 更新文件上传状态
        if (percentage < 100) {
          onProgress && onProgress(percentage, file);
          updateFileList(_file, { status: 'uploading', percent: percentage })
        }
      },
      withCredentials
    }).then((res) => {
      onSuccess && onSuccess(res, file)
      onChange && onChange(file)
      updateFileList(_file, { status: 'success', response: res.data })
    }).catch((err) => {
      onError && onError(err, file)
      onChange && onChange(file)
      updateFileList(_file, { status: 'error', error: err })
    })
  }
  console.log(fileList);
  /** 点击删除触发的函数 */
  const handleRemove = (reomveFile: UploadFile) => {
    return setFileList(prevList => {
      return prevList.filter(file => file.uid !== reomveFile.uid)
    })
  }

  return (
    <div className='upload-component'>
      <div className='upload-input' onClick={handleClick}  style={{ display: 'inline-block' }} >
        {drag ?
          <Dragger onFile={(files) => { uploadFiles(files) }}>
            {children}
          </Dragger>
          : children
        }
      </div>
      {/* <Button btnType='primary' onClick={handleClick}>点击上传</Button> */}
      <input type="file" name="MyFile" multiple accept={accept} style={{ display: 'none' }} ref={fileInputRef} className='file-input' onChange={handleFileChange} />
      <UploadList uploadFileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

export default Upload;