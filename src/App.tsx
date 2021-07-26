import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { appendFile } from 'fs';
library.add(fas)

function App() {
  const [title, setTitle] = useState(false)
  const postData = {
    title: 'test Title',
    body: 'hello SH'
  }
  useEffect(() => {
    sendAjax()
  })
  const sendAjax = async () => {
    // const { data: { title } } = await axios.get('http://jsonplaceholder.typicode.com/posts/1')

    /** 自定义Header */
    // const { data: { title } } = await axios.get('http://jsonplaceholder.typicode.com/posts/1', {
    //   headers: {
    //     'X-Reauested-With': 'XMLHttpRequest',
    //   },
    //   responseType: 'json'
    // })

    /**post */
    const { data: { title } } = await axios.post('http://jsonplaceholder.typicode.com/posts', postData)

    setTitle(title)
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    const files = e.target.files;
    if (files) {
      const uploadFile = files[0];
      const formData = new FormData()
      uploadFile.size/2014 < 100 && formData.append(uploadFile.name, uploadFile);
      // debugger;
      const res = await axios.post('http://jsonplaceholder.typicode.com/posts', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      console.log(res);
    }

  }
  return (
    <div className="App">
      {/* 基础的上传 */}
      {/*
      <form method='post' encType='mutipart/form-data' action="http://jsonplaceholder.typicode.com/posts">
        <input type="file" name="myFile" />
        <button type='submit'>提交</button>
      </form> 
      */}

      <input type="file" name="myFile" onChange={handleChange} />

    </div>
  );
}

export default App;
