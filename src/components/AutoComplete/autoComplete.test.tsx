import React from "react";
import { config } from "react-transition-group";
import { render, fireEvent, RenderResult, waitFor, cleanup } from "@testing-library/react";
import AutoComplete, { AutoCompleteProps, dataSourceType } from "./autoComplete";

// 所有的异步直接变成同步
config.disabled = true;

interface testProps {
  value: string;
  number: number;
}

const testArray = [
  { value: 'yy', number: 11 },
  { value: 'yq', number: 17 },
  { value: 'ew', number: 215 },
  { value: 'sw', number: 45 }
]


const testRenderOption = (item: dataSourceType) => {
  const renderItem = item as dataSourceType<testProps>
  return (
    <div>
      <h3>value:{renderItem.value}</h3>
      <p>number:{renderItem.number}</p>
    </div>
  )

}

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => { return testArray.filter(item => item.value.includes(query)) },
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}

const renderOptionProps: AutoCompleteProps = {
  fetchSuggestions: (query) => { return testArray.filter(item => item.value.includes(query)) },
  onSelect: jest.fn(),
  placeholder: 'auto-complete-renderOption',
  renderOption: testRenderOption
}

let wrapper: RenderResult, inputNode: HTMLInputElement
describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  /** 基础功能 */
  it('test basic AutoComplete behavior', async () => {
    //input change
    fireEvent.change(inputNode, { target: { value: 'y' } })
    // should have two suggestion items
    await waitFor(() => {
      expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    })
    //click the first item
    fireEvent.click(wrapper.getByText('yy'))
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'yy', number: 11 })
    expect(wrapper.queryByText('yy')).not.toBeInTheDocument()
    expect(inputNode.value).toBe('yy')
  })
  /** 键盘事件 */
  it('should provide keyboard support', async () => {
    fireEvent.change(inputNode, { target: { value: 'y' } })
    await waitFor(() => {
      expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    })
    const firstContent = wrapper.getByText('yy')
    const secondContent = wrapper.getByText('yq')

    fireEvent.keyDown(inputNode, { key: 'ArrowDown' })
    expect(firstContent).toHaveClass('is-active')

    fireEvent.keyDown(inputNode, { key: 'ArrowDown' })
    expect(firstContent).not.toHaveClass('is-active')
    expect(secondContent).toHaveClass('is-active')

    fireEvent.keyDown(inputNode, { key: 'ArrowUp' })
    expect(firstContent).toHaveClass('is-active')
    expect(secondContent).not.toHaveClass('is-active')

    fireEvent.keyDown(inputNode, { key: 'Enter' })
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'yy', number: 11 })
    expect(inputNode.value).toBe('yy')
    expect(wrapper.queryByText('yy')).not.toBeInTheDocument()
  })

  /** 点击其他地方下拉框消失 */
  it('click outside should hide the dropdown', async () => {
    fireEvent.change(inputNode, { target: { value: 'y' } })
    await waitFor(() => {
      expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    })

    fireEvent.click(document)
    expect(wrapper.queryByText('yy')).not.toBeInTheDocument()
  })
  /** */
  it('renderOption should generate the right template', async () => {
    cleanup()
    const optionWrapper = render(<AutoComplete {...renderOptionProps} />)
    const inputNode = wrapper.getByPlaceholderText('auto-complete-renderOption') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'y' } })
    await waitFor(() => {
      expect(optionWrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
      expect(optionWrapper.queryByText('value:yy')).toBeInTheDocument()
    })
    const content = optionWrapper.queryByText('value:yy') as HTMLElement
    expect(content.tagName).toBe('H3')
    const pContent = optionWrapper.queryByText('number:11') as HTMLElement
    expect(pContent.tagName).toBe('P')
  })

  it('async fetchSuggestions should works fine', () => {

  })
})