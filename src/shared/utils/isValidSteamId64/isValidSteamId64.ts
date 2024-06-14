const STEAM_ID_64_LENGTH = 17;

export const isValidSteamId64 = (steamId: unknown) => {
  if (!steamId) {
    return false;
  }

  if (typeof steamId === 'string' && steamId.length === STEAM_ID_64_LENGTH) {
    return Boolean(parseInt(steamId));
  }

  return typeof steamId === 'number';
};
