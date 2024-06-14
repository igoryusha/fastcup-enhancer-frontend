import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import React from 'react';

import { store } from '@content/store';

import { isValidSteamId64 } from '@shared/utils/isValidSteamId64';

import { ProcessFn } from '@content/utils/Observer';
import { getSteamIdFromAnchor } from '@content/utils/getSteamIdFromAnchor';
import { findSteamProfileAnchorNode } from '@content/utils/findSteamProfileAnchorNode';

import { FaceitIcon } from './components/FaceitIcon';

export const processPlayerProfile: ProcessFn = (pageInfo, node) => {
  const steamLinkNode = findSteamProfileAnchorNode(node);
  const steamLinkWrapperEl = steamLinkNode?.parentElement;
  const linksListEl = steamLinkNode?.parentNode?.parentElement;

  if (!steamLinkNode || !steamLinkWrapperEl || !linksListEl) {
    return;
  }

  const steamId = getSteamIdFromAnchor(steamLinkNode);

  if (!isValidSteamId64(steamId)) {
    return;
  }

  const rootEl = steamLinkWrapperEl.cloneNode();

  linksListEl.insertBefore(rootEl, steamLinkWrapperEl);

  const root = createRoot(rootEl as HTMLElement);

  root.render(
    <Provider store={store}>
      <FaceitIcon steamId={steamId} />
    </Provider>
  );
};
