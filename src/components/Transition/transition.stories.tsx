import React, { useState } from 'react';
import Button from '../Button';
import { storiesOf } from '@storybook/react'

import Transition from './transition';


const DefalutTransition = () => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <Button onClick={() => { setShow(!show) }}>toggle</Button>
      <Transition
        in={show}
        timeout={500}
        animation='zoom-in-bottom' >
        <div style={{ backgroundColor: 'skyblue', width: '200px', height: '200px' }}>出现</div>
      </Transition>

    </div>
  )
}

storiesOf('Transition Component', module)
  .add('Transition', DefalutTransition)