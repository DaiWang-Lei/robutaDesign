import React from 'react'
import { addDecorator, configure, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'

import '../src/styles/index.scss'
library.add(fas)

addDecorator(withInfo);
// 添加配置
addParameters({
  info: {
    inline: true, // 直接显示信息，不需要点击图标
    header: false // 不显示头部，比较好看
  }
})

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px',
}
// 定义内容居中的组件
const StoryWrapper = (storyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
)

addDecorator(StoryWrapper)


const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')]
  const req = require.context('../src/components', true, /\.stories\.tsx$/)
  req.keys().forEach(file => allExports.push(req(file)))
  return allExports
}
configure(loaderFn, module)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}