import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AutoComplete, { dataSourceType } from './autoComplete';

interface PeopleProps {
  value: string;
  age: number;
}

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

const simpleAutoComplete = () => {
  const humans = ['daiWang', 'Robuta', 'Lolita', 'xiXia', 'guXia', 'leiLei']

  const NameWithAge = [
    { value: 'daiWang', age: 18 },
    { value: 'Robuta', age: 21 },
    { value: 'Lolita', age: 7 },
    { value: 'xiXia', age: 16 },
    { value: 'guXia', age: 27 },
    { value: 'leiLei', age: 18 },

  ]
  // 简单的AutoComplete
  // const handleFetch1 = (value: string) => {
  //   return humans.filter(item => item.includes(value)).map(name => ({ value: name }))
  // }

  // 结构比较复杂的AutoComplete
  // const handleFetch = (query: string) => {
  //   return NameWithAge.filter(people => people.value.includes(query))
  // }

  // 发送请求的AutoComplete
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items);
        return items.slice(0, 10).map((item: any) => ({ value: item.login,...item }))
      })
  }
  const renderOption = (item: dataSourceType) => {
    // ？？？不能直接将dataSourceType<PeopleProps>写到形参里
    const renderItem = item as dataSourceType<GithubUserProps>
    return (
      <>
        <h3>Name:{renderItem.value}</h3>
        <p>url:{renderItem.url}</p>
      </>
    )
  }
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderOption={renderOption}
    />
  )
}
storiesOf('autoComplete component', module)
  .add('autoCompletet', simpleAutoComplete)