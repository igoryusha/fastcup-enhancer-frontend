const getBaseUrl = () => {
  const url = process.env.API_BASE_URL;

  if (!url) {
    throw new Error('API_BASE_URL is not presented');
  }

  return url;
};

export interface PlayerProfile {
  nickname: string;
  elo: number;
  url: string;
}

export const getPlayerProfile = async (
  steamId: string
): Promise<PlayerProfile> => {
  const response = await fetch(`${getBaseUrl()}/api/v1/profile/${steamId}`);

  if (response.ok) {
    const {
      nickname,
      elo: { current: currentElo },
      profileUrl,
    } = await response.json();

    return {
      nickname,
      elo: currentElo,
      url: profileUrl,
    };
  } else {
    throw await response.json();
  }
};
