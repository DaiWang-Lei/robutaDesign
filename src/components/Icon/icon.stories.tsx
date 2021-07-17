import React from 'react'
import { storiesOf } from '@storybook/react'
import Icon from './icon'

const dogIcon = () => (
  <Icon icon='dog' theme='danger' />
)
storiesOf('Icon图标', module)
  .add('Icon图标',dogIcon)