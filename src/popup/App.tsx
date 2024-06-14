import classNames from 'classnames/bind';
import React, { FC, useState } from 'react';

import { i18n } from '@shared/utils/i18n';

import { Tabs } from './components/Tabs';

import { Header } from './Header';
import { About } from './About';
import { General } from './General';

import styles from './App.local.css';

const cx = classNames.bind(styles);

const availableSections = {
  general: General,
  about: About,
};

const availableTabs = [
  { id: 'general' as const, option: i18n('general_tab_title') },
  { id: 'about' as const, option: i18n('about_tab_title') },
];
const defaultTab = availableTabs[0];

const App: FC = () => {
  const [ActiveSection, setActiveSection] = useState<
    FC<{ className?: string }>
  >(() => {
    return availableSections[defaultTab.id];
  });

  const handleTabChange = (tab: ArrayElement<typeof availableTabs>) => {
    setActiveSection(() => availableSections[tab.id]);
  };

  return (
    <div className={cx('app')}>
      <Header />

      <div className={cx('content')}>
        <div className={cx('tabs-holder')}>
          <Tabs<typeof availableTabs>
            defaultTab={defaultTab}
            tabs={availableTabs}
            onChange={handleTabChange}
          />
        </div>

        <ActiveSection className={cx('section')} />
      </div>
    </div>
  );
};

export default App;
