import React, { ChangeEvent, useState } from 'react';
import Input, { InputProps } from '../Input/input';

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**  */
  fetchSuggestions: (str: string) => string[];
  /** 选中之后的回调 */
  onSelect?: (item: string) => void;
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, ...restProps } = props;
  const [inputValue, setInputValue] = useState('')
  const [suggesstions, setSuggesstions] = useState<string[]>([])

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    if (value) {
      const results = fetchSuggestions(value)
      setSuggesstions(results)
    } else {
      setSuggesstions([])
    }
  }

  const handleClick = (item: string) => {
    setInputValue(item)
    setSuggesstions([])
    if (onSelect) {
      onSelect(item)
    }
  }
  const renderSelections = () => {
    if (suggesstions.length > 0) {
      return (
        <ul>
          {
            suggesstions.map((item, index) => (
              <li key={index} onClick={() => handleClick(item)}>{item}</li>
            ))
          }
        </ul>
      )
    }
  }
  return (
    <div className='auto-complete'>
      <Input
        value={inputValue}
        onChange={handleInput}
        {...restProps}
      />
      {renderSelections()}
    </div>
  )
}
export default AutoComplete;