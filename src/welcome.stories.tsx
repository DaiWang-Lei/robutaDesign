import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Welcome Page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎使用 Robuta Design 组件库</h1>
        <p>相信会给您带来一些使用上的便捷</p>
        <h3>赶紧试试</h3>
        <code>yarn add robutadesign</code>
      </>
    )
  }, { info: { disable: true } })
