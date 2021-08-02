import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { render, RenderResult, fireEvent, waitFor, createEvent } from '@testing-library/react'
import Upload, { UploadProps } from './upload'
import axios from 'axios'

jest.mock('../Icon/icon', () => {
  // @ts-ignore
  return ({ icon, onClick }) => {
    return <span onClick={onClick}>{icon}</span>
  }
})
jest.mock('axios')

const testProps: UploadProps = {
  action: 'fakeUrl.com',
  onChange: jest.fn(),
  onSuccess: jest.fn(),
  onRemove: jest.fn(),
  drag: true
}
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })

const mockedAxios = axios as jest.Mocked<typeof axios>
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;

describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to Upload</Upload>)
    fileInput = wrapper.container.querySelector('.file-input') as HTMLInputElement
    uploadArea = wrapper.queryByText('Click to Upload') as HTMLElement

    //模拟axios请求
    mockedAxios.post.mockImplementation(() => {
      return Promise.resolve({ 'data': 'success' })
    })
  })


  it('upload process should work fine', async () => {
    const { queryByText } = wrapper;
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [testFile] } })
    expect(queryByText('spinner')).toBeInTheDocument()
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    expect(queryByText('check-circle')).toBeInTheDocument()
    expect(testProps.onChange).toHaveBeenCalledWith(testFile)
    expect(testProps.onSuccess).toHaveBeenCalledWith({ 'data': 'success' }, testFile)

    // 删除按钮
    const trashIcon = queryByText('trash-alt') as HTMLElement
    expect(trashIcon).toBeInTheDocument()
    fireEvent.click(trashIcon)
    expect(queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.png'
    }))
  })

  it('drag and drop files should works fine', async () => {
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    const mockDropEvent = createEvent.drop(uploadArea)
    Object.defineProperty(mockDropEvent, 'dataTransfer', {
      value: {
        files: [testFile]
      }
    })
    fireEvent(uploadArea, mockDropEvent)
    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith({ 'data': 'success' }, testFile)
  })
})