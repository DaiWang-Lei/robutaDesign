import { FC } from "react";
import Tabs, { TabsProps } from "./tabs";
import TabsItem, { TabsItemProps } from "./tabsItem";

export type ITabsComponent = FC<TabsProps> & {
  TabsItem: FC<TabsItemProps>
}

const TransTabs = Tabs as ITabsComponent
TransTabs.TabsItem = TabsItem

export default TransTabs;