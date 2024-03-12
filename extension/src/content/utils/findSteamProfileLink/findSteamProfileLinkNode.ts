const SELECTOR = 'a[href^="https://steamcommunity.com/profiles/"]';

const findSteamProfileLinkNode = (
  node: Node | HTMLElement
): null | HTMLAnchorElement => {
  if ('querySelector' in node) {
    const a = node.querySelector<HTMLAnchorElement>(SELECTOR);

    return a;
  }

  return null;
};

export default findSteamProfileLinkNode;
