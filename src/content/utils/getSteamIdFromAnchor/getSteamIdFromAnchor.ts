export const getSteamIdFromAnchor = (
  steamLinkNode: HTMLAnchorElement
): string | void => {
  return steamLinkNode.href.split('/').at(-1);
};
