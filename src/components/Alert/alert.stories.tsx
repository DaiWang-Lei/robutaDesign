import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Alert from './alert'
const defaultAlert = () => (
  <Alert title='这是个Alert'  onClose={action('关闭了')} />
)
const alertWithType = () => (
  <div>
    <Alert title='这是个danger'  type='danger'>
    </Alert>
    <Alert title='这是个success' type='success'>
    </Alert>
    <Alert title='这是个warning' closable={false} type='warning'>
    </Alert>
  </div>
)

const alertWithMessage = () => (
  <Alert title='message Alert' message='这是自定义提示语' />
)


storiesOf('Alert Component', module)
  .add('Alert', defaultAlert)
  .add('不同类型的Alert', alertWithType)
  .add('带message的Alert', alertWithMessage)

