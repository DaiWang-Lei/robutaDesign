import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Tabs from './tabs';
import TabsItem from './tabsItem';
import Icon from '../Icon/icon';

const defaultTabs = () => (
  <Tabs>
    <TabsItem label='选项卡一'>
      content one
    </TabsItem>
    <TabsItem label='选项卡二'>
      content two
    </TabsItem>
    <TabsItem label='选项卡三'>
      content three
    </TabsItem>
  </Tabs>
)


const tabsWithOutline = () => (
  <Tabs
    onSelect={action('click')}
    styleType='outline'
  >
    <TabsItem label='card1'>
      card one
    </TabsItem>
    <TabsItem label='card2' disabled>
      card two
    </TabsItem>
    <TabsItem label='card3'>
      card three
    </TabsItem>
  </Tabs>
)
export const tabsWithCustom = () => (
  <Tabs
    onSelect={function noRefCheck(){}}
    styleType="outline"
  >
    <TabsItem label={<><Icon icon='users-cog' />{'  '}自定义图标</>}>
      this is card one
    </TabsItem>
    <TabsItem label="tab2">
      this is content two
    </TabsItem>
  </Tabs>
)

storiesOf('Tabs Component', module)
  .add('Tabs', defaultTabs)
  .add('选项卡样式的Tabs', tabsWithOutline)
  .add('自定义选项卡样式 Tabs', tabsWithCustom)
