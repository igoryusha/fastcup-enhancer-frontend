import classNames from 'classnames/bind';
import React, { FC } from 'react';

import { LinkProps } from './Link.props';

import styles from './Link.local.css';

const cx = classNames.bind(styles);

export const Link: FC<LinkProps> = (props) => {
  const { className = '', children, ...rest } = props;

  return (
    <a
      className={`${className} ${cx('link')}`}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  );
};
