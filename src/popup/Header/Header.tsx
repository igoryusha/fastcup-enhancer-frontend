import classNames from 'classnames/bind';
import React, { FC } from 'react';

import Logo from '@shared/icons/logo.svg';

import styles from './Header.local.css';

const cx = classNames.bind(styles);

export const Header: FC = () => {
  return (
    <header className={cx('header')}>
      <Logo className={cx('logo')} />
      <h1 className={cx('title')}>Fastcup Enhancer</h1>
    </header>
  );
};
