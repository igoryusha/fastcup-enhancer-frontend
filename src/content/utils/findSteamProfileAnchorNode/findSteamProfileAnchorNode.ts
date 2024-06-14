import { STEAM_PROFILE_ANCHOR_SELECTOR } from '@shared/constants/STEAM_PROFILE_ANCHOR_SELECTOR';

export const findSteamProfileAnchorNode = (
  node: Node | HTMLElement
): null | HTMLAnchorElement => {
  if ('querySelector' in node) {
    const a = node.querySelector<HTMLAnchorElement>(
      STEAM_PROFILE_ANCHOR_SELECTOR
    );

    return a;
  }

  return null;
};
