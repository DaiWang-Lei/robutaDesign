import { useState } from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Input from './input';

const ControlledInput = () => {
  const [value, setValue] = useState('')
  return <Input value={value} onChange={(e) => { setValue(e.target.value) }} />
}

const defalutInput = () => (
  <div  style={{ width: '300px' }}>
    <Input
      placeholder='请输入'
      onChange={action('changed')}
    />
    < ControlledInput />
  </div>

)
const inputWithSize = () => (
  <div>
    <Input size='lg'
      style={{ width: '300px' }}
      placeholder='large Input'
      onChange={action('changed')}

    />
    <Input size='sm'
      style={{ width: '300px' }}
      placeholder='small Input'
      onChange={action('changed')}

    />
  </div>
)

const disabledInput = () => (
  <Input disabled
    style={{ width: '300px' }}
  />
)

const pandInput = () => (
  <div>
    <Input
      defaultValue="baidu"
      append='.com'
      style={{ width: 300 }}
      onChange={action('changed')}
    />
    <Input
      defaultValue="baidu"
      prepend="www."
      style={{ width: 300 }}
      onChange={action('changed')}
    />
  </div>
)

const iconInput = () => (
  <Input
    defaultValue="input with icon"
    icon='search'
    style={{ width: 300 }}
    onChange={action('changed')}
  />

)

storiesOf('Input Component', module)
  .add('Input', defalutInput)
  .add('大小不同的Input', inputWithSize)
  .add('被禁用的Input', disabledInput)
  .add('带前后缀的 Input', pandInput)
  .add('带图标的 Input', iconInput)

