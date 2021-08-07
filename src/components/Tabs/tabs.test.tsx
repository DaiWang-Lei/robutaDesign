import React from "react";
import { render, RenderResult, fireEvent } from "@testing-library/react";
import Tabs, { TabsProps } from "./tabs";
import TabsItem from "./tabsItem";

const testProps: TabsProps = {
  defaultIndex: 0,
  styleType: 'underline',
  onSelect: jest.fn()
}

const generateTabs = (props: TabsProps) => (
  <Tabs {...props}>
    <TabsItem label='card1'>
      card one
    </TabsItem>
    <TabsItem label='card2'>
      card two
    </TabsItem>
    <TabsItem label='disabled' disabled>
      card disabled
    </TabsItem>
  </Tabs>
)


const createStyleFile = () => {
  const cssFile: string = `
  .tabs-content{
    display:none;
  }
  .tabs-content.tabs-content-active{
    display:block;
  }
  `
  const style = document.createElement('style')
  style.innerHTML = cssFile
  return style
}
let wrapper: RenderResult, activeLabel: HTMLElement, activeContent: HTMLElement

describe('test Tabs and TabsItem component in default (underline) mode', () => {
  beforeEach(() => {
    wrapper = render(generateTabs(testProps))
    wrapper.container.appendChild(createStyleFile())
    activeLabel = wrapper.getByText('card1')
    activeContent = wrapper.getByText('card one')
  })


  it('should render correct Tabs and TabsItem based on default props', () => {
    expect(activeLabel).toBeInTheDocument()
    expect(activeLabel).toHaveClass('tabs-label tabs-label-active')
    expect(activeContent).toBeVisible()

    const labelTwo = wrapper.getByText('card2')
    const conentTwo = wrapper.getByText('card two')
    fireEvent.click(labelTwo)
    expect(testProps.onSelect).toBeCalled()
    expect(activeContent).not.toBeVisible()
    expect(conentTwo).toBeVisible()

    const tabelDis = wrapper.getByText('disabled')
    const contentDis = wrapper.getByText('card disabled')
    fireEvent.click(tabelDis)
    expect(contentDis).not.toBeVisible()


  })
})