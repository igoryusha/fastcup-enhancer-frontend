import classNames from 'classnames/bind';
import React, { FC } from 'react';

import { Hr } from '@shared/ui/Hr';
import { Text } from '@shared/ui/Text';

import {
  SectionGroupProps,
  SectionItemProps,
  SectionProps,
} from './Section.types';

import { ClickableAnimatedItem } from '@shared/ui/ClickableAnimatedItem/ClickableAnimatedItem';

import styles from './Section.local.css';

const cx = classNames.bind(styles);

export const Section: FC<SectionProps> & {
  Group: FC<SectionGroupProps>;
  Item: FC<SectionItemProps>;
} = (props) => {
  const { title, children } = props;

  return (
    <div>
      <Text
        className={cx('section-title')}
        as="h2"
        weight="bold"
        color="primary"
        size="l"
      >
        {title}
      </Text>

      {children}
    </div>
  );
};

Section.Item = (props) => {
  const { className: externalClassName = '', title, description, as } = props;

  const className = `${externalClassName} ${cx('item', {
    [`item--${as}`]: as !== 'text',
  })}`;

  const content = (
    <div className={cx('item-content')}>
      {title && (
        <Text as="h2" size="l" color="primary">
          {title}
        </Text>
      )}

      {description && (
        <Text as="p" size="m" color="secondary">
          {description}
        </Text>
      )}
    </div>
  );

  if (as === 'text') {
    return <div className={className}>{content}</div>;
  }

  if (as === 'link') {
    const { href } = props;

    return (
      <ClickableAnimatedItem>
        <a
          className={className}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}

          <svg
            className={cx('link-icon')}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h6v6"></path>
            <path d="M10 14 21 3"></path>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          </svg>
        </a>
      </ClickableAnimatedItem>
    );
  }

  const { control } = props;

  return (
    <ClickableAnimatedItem className={className}>
      {content}

      {control}
    </ClickableAnimatedItem>
  );
};

Section.Group = (props) => {
  const { className, children } = props;

  const lastIndex = React.Children.count(children) - 1;

  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        return (
          <>
            {child}

            {index !== lastIndex && <Hr variant="primary" />}
          </>
        );
      })}
    </div>
  );
};
