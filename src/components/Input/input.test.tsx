import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input, { InputProps } from './input';

const defaultProps = {
  onChange: jest.fn(),
  placeholder: 'test-input'
}

const sizesProps: InputProps = {
  size: 'lg',
  placeholder: 'sizes'
}

const disabledProps: InputProps = {
  disabled: true,
  placeholder: 'disabled',
  onChange: jest.fn()
}

const pendProps: InputProps = {
  append: '.com',
  prepend: 'www.',
  placeholder: 'pend'
}

describe('test Input Component', () => {
  it('should render the correct default input', () => {
    const wrapper = render(<Input {...defaultProps} />)

    const element = wrapper.getByPlaceholderText('test-input') as HTMLInputElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('INPUT')
    expect(element).toHaveClass('input-inner')
    fireEvent.change(element, { target: { value: 'yyds' } })
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(element.value).toEqual('yyds')
  })

  it('should render different input sizes on size property', () => {
    const wrapper = render(<Input {...sizesProps} />)
    const testContainer = wrapper.container.querySelector('.input-wrapper')
    expect(testContainer).toBeInTheDocument()
    expect(testContainer).toHaveClass('input-size-lg')
  })

  it('should render disabled input  when disabled set to true', () => {
    const wrapper = render(<Input {...disabledProps} />)
    const element = wrapper.getByPlaceholderText('disabled') as HTMLInputElement
    const disabledContainer = wrapper.container.querySelector('.input-wrapper')
    expect(disabledContainer).toBeInTheDocument()
    expect(disabledContainer).toHaveClass('is-disabled')
    expect(element.disabled).toBeTruthy()
  })

  it('should render prepand and append element on prepad/append property', () => {
    const { queryByText, container } = render(<Input {...pendProps} />)
    const element = container.querySelector('.input-wrapper')
    expect(element).toHaveClass('input-group', 'input-group-append', 'input-group-prepend', 'input-group-prepend')
    expect(queryByText('www.')).toBeInTheDocument()
    expect(queryByText('.com')).toBeInTheDocument()
  })
})