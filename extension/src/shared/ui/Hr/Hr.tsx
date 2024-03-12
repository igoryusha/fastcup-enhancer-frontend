import classNames from 'classnames/bind';
import React, { FC } from 'react';

import { HrProps } from './Hr.props';

import styles from './Hr.local.css';

console.log('styles: ', styles);

const cx = classNames.bind(styles);

export const Hr: FC<HrProps> = (props) => {
  const { className = '', variant, ...rest } = props;

  return (
    <hr className={`${className} ${cx('hr', `hr--variant--${variant}`)}`} />
  );
};
