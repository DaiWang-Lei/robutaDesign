import React, { ChangeEvent, ReactElement, useEffect, useRef, useState, KeyboardEvent } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import useDebounce from '../../hooks/useDebounce';
import Icon from '../Icon/icon';
import useClickOutside from '../../hooks/useClickOutside';
interface dataSourceObject {
  value: string
}
export type dataSourceType<T = {}> = T & dataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**  */
  fetchSuggestions: (str: string) => dataSourceType[] | Promise<dataSourceType[]>;
  /** 选中之后的回调 */
  onSelect?: (item: dataSourceType) => void;
  /** 自定义下拉模板 */
  renderOption?: (item: dataSourceType) => ReactElement;
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, renderOption, value, ...restProps } = props;
  const [inputValue, setInputValue] = useState('')
  const [suggesstions, setSuggesstions] = useState<dataSourceType[]>([])
  // 防抖
  const debouncedValue = useDebounce(inputValue, 500)
  //
  const triggerSearch = useRef(false);
  // 设置高亮的索引
  const [hightlightIndex, setHighlightIndex] = useState(-1);
  // 设置loading
  const [loading, setLoading] = useState(false);
  // outsideRef
  const autoCompleteRef = useRef<HTMLDivElement>(null)
  // 
  useClickOutside(autoCompleteRef, () => { setSuggesstions([]) })
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setSuggesstions(data)
          setLoading(false)
        })
      } else {
        setSuggesstions(results)
      }
    } else {
      setSuggesstions([])
    }
    setHighlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])

  // 
  const highLight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggesstions.length) index = suggesstions.length - 1;
    setHighlightIndex(index);
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {

      case 'ArrowUp':
        highLight(hightlightIndex - 1)
        break;
      case 'ArrowDown':
        highLight(hightlightIndex + 1)
        break;
      case 'Escape':
        setHighlightIndex(-1);
        setSuggesstions([]);
        break;
      case 'Enter':
        suggesstions[hightlightIndex] && handleSelect(suggesstions[hightlightIndex])
        break;
      default:
        break;

    }
  }

  // input框修改时调用
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true;
  }

  // 选中下拉框内容时调用
  const handleSelect = (item: dataSourceType) => {
    setInputValue(item.value)
    setSuggesstions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false;
  }
  //生成渲染的模板
  const renderTemplate = (item: dataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const renderSelections = () => {
    if (suggesstions.length > 0) {
      return (
        <ul className='suggestion-list'>
          {loading &&
            <div className='suggstions-loading-icon'>
              <Icon icon="spinner" spin />
            </div>
          }
          {
            !loading && suggesstions.map((item, index) => {
              const cnames = classNames('suggestion-item', {
                'is-active': index === hightlightIndex
              })
              return (<li key={index} className={cnames} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>)
            })
          }
        </ul>
      )
    }
  }
  return (
    <div className='auto-complete' ref={autoCompleteRef}>
      <Input
        value={inputValue}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {renderSelections()}
    </div>
  )
}
export default AutoComplete;