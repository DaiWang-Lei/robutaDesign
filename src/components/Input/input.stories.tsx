import React from 'react';
import { storiesOf } from '@storybook/react'
import Input from './input';

const defalutInput = () => (
  <Input />
)
const inputWithSize = () => (
  <div>
    <Input size='lg' />
    <Input size='sm' />
  </div>
)

const disabledInput = () => (
  <Input disabled />
)

const pandInput = () => (
  <Input defaultValue="baidu" prepend="www." append='.com' style={{ width: 300 }} />
)

const iconInput = () => (
  <Input defaultValue="input with icon" icon='search' style={{ width: 300 }} />

)

storiesOf('Input Component', module)
  .add('Input', defalutInput)
  .add('大小不同的Input', inputWithSize)
  .add('被禁用的Input', disabledInput)
  .add('带前后缀的 Input', pandInput)
  .add('带图标的 Input', iconInput)

