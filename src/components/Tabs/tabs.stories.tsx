import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Tabs from './tabs';
import TabsItem from './tabsItem';

const defaultTabs = () => (
  <Tabs>
    <TabsItem label='1'>
      1
    </TabsItem>
    <TabsItem label='2'>
      2
    </TabsItem>
    <TabsItem label='3'>
      3
    </TabsItem>
  </Tabs>
)
storiesOf('Tabs Component', module)
  .add('Tabs', defaultTabs)