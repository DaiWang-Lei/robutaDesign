import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Alert, { AlertProps } from './alert';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const defaultProps: AlertProps = {
  onClose: jest.fn(),
  title: '默认Title',
  type: 'primary',
  message: '默认Message'
}

const closeProps: AlertProps = {
  title: 'close',
  closable: false,
  onClose: jest.fn()
}
const successProps: AlertProps = {
  title: 'successTitle',
  message: 'successMessage',
  type:'success',
}

describe('test Alert Component', () => {
  it('should render the currect default Alert', async () => {
    const wrapper = render(<Alert {...defaultProps} />)
    const titleElement = wrapper.getByText('默认Title');
    expect(titleElement).toBeInTheDocument()
    expect(titleElement.tagName).toEqual('H4')
    expect(titleElement).toHaveClass('alert-title')
    // fireEvent.click()

    const messageElement = wrapper.getByText('默认Message')
    expect(messageElement).toBeInTheDocument()
    expect(messageElement.tagName).toEqual('P')
    expect(messageElement).toHaveClass('alert-message')

    const iconElement = wrapper.container.querySelector('.alert-icon') as HTMLElement
    expect(iconElement).toBeInTheDocument()
    expect(iconElement?.tagName).toEqual('svg')

    fireEvent.click(iconElement)
    await waitFor(() => {
      expect(titleElement).not.toBeInTheDocument()
      expect(defaultProps.onClose).toBeCalled()
    })
  })

  it('should render a alert not have closeIcon', () => {
    const wrapper = render(<Alert {...closeProps} />)
    const iconElement = wrapper.container.querySelector('.alert-icon') as HTMLElement
    expect(iconElement).not.toBeInTheDocument()
  })

  it('should render the correct component base on different props', () => {
    const wrapper = render(<Alert {...successProps} />)
    const titleElement = wrapper.getByText('successTitle');
    expect(titleElement).toBeInTheDocument()
    expect(titleElement.parentNode).toHaveClass('alert-success')
  })
})
