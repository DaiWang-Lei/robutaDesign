import React from 'react';
import { storiesOf } from '@storybook/react';
import Progress from './progress'

const defaultProgress = () => (
  <Progress percent={30} />
)

const progressWithThem = () => (
  <div>
    <Progress percent={10} them='primary' />
    <Progress percent={20} them='danger' showText={false}/>
    <Progress percent={30} them='warning' />
    <Progress percent={40} them='info' showText={false}/>
    <Progress percent={50} them='success' />
    <Progress percent={60} them='light' showText={false}/>
    <Progress percent={70} them='secondary' />
    <Progress percent={80} them='dark' showText={false}/>
  </div>
)

const strokeHeightWithProgress = () => (
  <div>
    <Progress percent={10} them='primary' strokeHeight={10} />
    <Progress percent={20} them='danger' strokeHeight={20}/>
    <Progress percent={30} them='warning' strokeHeight={30}/>
    <Progress percent={40} them='info'strokeHeight={40}/>
  </div>

)

storiesOf('Progress Comonent', module)
  .add('Progress', defaultProgress)
  .add('主题及文字', progressWithThem)
  .add('不同的高度', strokeHeightWithProgress)