import React, { FC, useState } from 'react';
import classNames from 'classnames/bind';

import { Text } from '@shared/ui/Text';
import { ClickableAnimatedItem } from '@shared/ui/ClickableAnimatedItem/ClickableAnimatedItem';

import { Tab, TabsProps } from './Tabs.types';

import styles from './Tabs.local.css';

const cx = classNames.bind(styles);

export const Tabs = <T extends Tab[]>(props: TabsProps<T>) => {
  const { className, tabs, defaultTab = tabs[0], onChange = () => {} } = props;

  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div>
      {tabs.map((tab) => {
        const handleClick = () => {
          setActiveTab(tab);

          onChange(tab as ArrayElement<T>);
        };

        return (
          <ClickableAnimatedItem key={tab.id}>
            <div
              className={`${className} ${cx('tab', {
                'tab--active': tab.id === activeTab.id,
              })}`}
              onClick={handleClick}
            >
              <Text as="span" size="l" color="primary">
                {tab.option}
              </Text>
            </div>
          </ClickableAnimatedItem>
        );
      })}
    </div>
  );
};
