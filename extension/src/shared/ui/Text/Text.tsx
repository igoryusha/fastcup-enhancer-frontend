import classNames from 'classnames/bind';
import React, { FC } from 'react';

import { TextProps } from './Text.props';

import styles from './Text.local.css';

const cx = classNames.bind(styles);

export const Text: FC<TextProps> = (props) => {
  const { as, className = '', color, size, weight = 'normal', ...rest } = props;

  return React.createElement(as, {
    ...rest,

    className: `${className} ${cx({
      [`text--color--${color}`]: color,
      [`text--size--${size}`]: size,
      [`text--weight--${weight}`]: weight !== 'normal',
    })}`,
  });
};
