import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import React from 'react';

import { store } from '@content/store';
import findSteamProfileLinkNode from '@content/utils/findSteamProfileLink/findSteamProfileLinkNode';

import { FaceitIcon } from './components/FaceitIcon';

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

  root.render(
    <Provider store={store}>
      <FaceitIcon steamId={steamId} />
    </Provider>
  );
};

export default processFaceitLinks;
