import  React from 'react';
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './button';

const defaultProps = {
  onClick: jest.fn()
}

// const 
const testProps: ButtonProps = {
  size: 'lg',
  btnType: 'danger',
  className: 'kllas'
}

const disabledProps: ButtonProps = {
  disabled:true,
  onClick:jest.fn()
}
// 测试button组件
describe('test Button component', () => {
  // it 等同于test
  // 测试默认按钮
  it('should render the correct default button', () => {
    // 渲染button
    const wrapper = render(<Button {...defaultProps}>Hello Test</Button>)
    // 获取button元素
    const element = wrapper.getByText('Hello Test') as HTMLButtonElement
    // 期待 button挂载到dom树上
    expect(element).toBeInTheDocument()
    // 期待button的标签是BUTTON
    expect(element.tagName).toEqual('BUTTON')
    // 期待button上有`btn btn-default`两个标签名称
    expect(element).toHaveClass('btn btn-default')
    // 模拟点击事件
    fireEvent.click(element)
    // 期待默认props的onClick事件，被调用了
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  // 根据不同的props展示不同的按钮
  it(' should render the correct compoment based on different props', () => {
    const wrapper = render(<Button {...testProps}>Props</Button>)
    const element = wrapper.getByText('Props') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn btn-lg btn-danger kllas')

  })
  // 当类型为link时渲染一个a标签
  it('should render a  link when btnType equals link and href is provided', () => {
    const wrapper = render(<Button btnType='link' href='http://www.baidu.com'>A</Button>)
    const element = wrapper.getByText('A') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })

  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Dis</Button>)
    const element = wrapper.getByText('Dis') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toBeCalled()
  })
})