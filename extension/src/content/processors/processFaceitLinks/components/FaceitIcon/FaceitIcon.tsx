import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import React, { FC, useEffect, useState } from 'react';

import {
  PlayerProfile,
  useGetPlayerProfileQuery,
} from '@content/services/Faceit';

import Icon from './Icon/Icon';

import { FaceitIconProps } from './FaceitIcon.props';

const isValidSteamId = (steamId: unknown) => {
  if (!steamId) {
    return false;
  }

  if (typeof steamId === 'string') {
    return Boolean(parseInt(steamId));
  }

  return typeof steamId === 'number';
};

export const FaceitIcon: FC<FaceitIconProps> = (props) => {
  const { steamId } = props;

  const isValid = isValidSteamId(steamId);

  const {
    error,
    data: profile,
    isLoading,
  } = useGetPlayerProfileQuery(steamId, {
    skip: !isValid,
  });

  let rightContent = '[ERROR - Something went wrong]';

  if (isValid) {
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
    } else if (profile) {
      if (Object.keys(profile).length) {
        const { elo, nickname } = profile as PlayerProfile;

        rightContent = `${nickname} [${elo}]`;
      } else {
        rightContent = 'Player does not exest on faceit';
      }
    } else if (isLoading) {
      rightContent = 'Loading...';
    }
  } else {
    rightContent = 'Steam ID on page were not found or it is invalid';
  }

  return (
    <div>
      <a
        href={
          profile && Object.keys(profile).length
            ? (profile as PlayerProfile).url
            : undefined
        }
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Icon />

        <span
          style={{
            lineHeight: 0,
          }}
        >
          &nbsp;|&nbsp;{rightContent}
        </span>
      </a>
    </div>
  );
};
