import React, { FC, useEffect, useState } from 'react';

import { getPlayerProfile, PlayerProfile } from '@content/api/Faceit/Faceit';

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

const FaceitIcon: FC<FaceitIconProps> = (props) => {
  const { steamId } = props;

  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);

  const isValid = isValidSteamId(steamId);

  useEffect(() => {
    if (!isValid) {
      return;
    }

    const getData = async () => {
      try {
        const playerProfile = await getPlayerProfile(steamId);

        setProfile(playerProfile);
      } catch (error: any) {
        setError({ message: error.message });
      }
    };

    getData();
  }, []);

  let rightContent = null;

  if (isValid) {
    if (error) {
      const { message } = error;

      rightContent = `[ERROR - "${message}"]`;
    } else if (profile) {
      const { elo, nickname } = profile;

      rightContent = `${nickname} [${elo}]`;
    } else {
      rightContent = 'Loading...';
    }
  } else {
    rightContent = 'Steam ID on page were not found or it is invalid';
  }

  return (
    <div>
      <a
        href={profile?.url}
        target="_blank"
        rel="noopener noreferre"
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

export default FaceitIcon;
