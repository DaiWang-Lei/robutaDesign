import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AutoComplete from './autoComplete';

const simpleAutoComplete = () => {
  const humans = ['daiWang', 'Robuta', 'Lolita', 'xiXia', 'guXia', 'leiLei']

  const handleFetch = (value: string) => {
    return humans.filter(item => item.includes(value))
  }
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
    />
  )
}
storiesOf('autoComplete component', module)
  .add('autoCompletet', simpleAutoComplete)