import classNames from 'classnames/bind';
import React, { FC } from 'react';

import { i18n } from '@shared/utils/i18n';

import { useGetPlayerProfileQuery } from '@content/services/Faceit';

import Icon from './Icon/Icon';

import { FaceitIconProps } from './FaceitIcon.props';

import styles from './FaceitIcon.local.css';

const cx = classNames.bind(styles);

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Icon />

      <span className={cx('right-content')}>&nbsp;|&nbsp;{children}</span>
    </>
  );
};

export const FaceitIcon: FC<FaceitIconProps> = (props) => {
  const { steamId } = props;

  const {
    error,
    data: profile,
    isLoading,
  } = useGetPlayerProfileQuery(steamId, {});

  let rightContent = `[ERROR - ${i18n('ooops_text')}]`;

  if (
    error &&
    'status' in error &&
    typeof error.data === 'object' &&
    error.data &&
    'message' in error.data
  ) {
    const {
      data: { message },
    } = error;

    rightContent = `[ERROR - "${message}"]`;
  } else if (profile && 'elo' in profile) {
    const { elo, nickname, url } = profile;

    return (
      <a
        className={cx('container')}
        href={url}
        onClick={(evt) => evt.stopPropagation()}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Content>
          {nickname} [{elo}]
        </Content>
      </a>
    );
  } else if (profile) {
    rightContent = i18n('player_does_not_exist');
  } else if (isLoading) {
    rightContent = `${i18n('loading')}...`;
  }

  return (
    <div className={cx('container')}>
      <Content>{rightContent}</Content>
    </div>
  );
};
