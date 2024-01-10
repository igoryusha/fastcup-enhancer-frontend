import React from 'react';
import { createRoot } from 'react-dom/client';

import findSteamProfileLinkNode from '@content/utils/findSteamProfileLink/findSteamProfileLinkNode';

import FaceitIcon from './components/FaceitIcon/FaceitIcon';

const processFaceitLinks = (node: Node | HTMLElement) => {
  const steamLinkNode = findSteamProfileLinkNode(node);
  const steamLinkWrapperEl = steamLinkNode?.parentElement;
  const linksListEl = steamLinkNode?.parentNode?.parentElement;

  if (!steamLinkNode || !steamLinkWrapperEl || !linksListEl) {
    return;
  }

  const rootEl = steamLinkWrapperEl.cloneNode();

  linksListEl.insertBefore(rootEl, steamLinkWrapperEl);

  const steamProfileLink = steamLinkNode.href;

  const steamId = steamProfileLink.split('/').at(-1);

  const root = createRoot(rootEl as HTMLElement);

  root.render(<FaceitIcon steamId={steamId} />);
};

export default processFaceitLinks;
