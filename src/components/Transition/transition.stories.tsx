import React from 'react';
import { storiesOf } from '@storybook/react'

import Transition from './transition';


const defalutTransition = () => (
  <div>
    <Transition
      in={true}
      timeout={300}
      animation='zoom-in-right' >
      <div>出现</div>
    </Transition>
  </div>
)

storiesOf('Transition', module)
  .add('Transition动画', defalutTransition)