import { forEach } from 'lodash';
import classNames from 'classnames/bind';
import { Provider } from 'react-redux';
import { createRoot, Root } from 'react-dom/client';
import React from 'react';

import { isValidSteamId64 } from '@shared/utils/isValidSteamId64';
import { getSteamIdFromAnchor } from '@content/utils/getSteamIdFromAnchor';
import { findSteamProfileAnchorNode } from '@content/utils/findSteamProfileAnchorNode';
import { Observer, ProcessFn } from '@content/utils/Observer';

import { store } from '@content/store';

import { FaceitLevel } from './components/FaceitLevel';

import styles from './processMatchPage.local.css';

const cx = classNames.bind(styles);

type PlayerInfo = { steamId: string; profileLink: HTMLElement };

let playersInfo: Partial<Record<string, PlayerInfo>> = {};

const mouseEnterEvent = new Event('mouseenter');
const mouseLeaveEvent = new Event('mouseleave');

let pageId = '';
let renderedComponents: Partial<
  Record<
    string,
    {
      root: Root;
      rootEl: HTMLElement;
      profileLink: HTMLElement;
    }
  >
> = {};

const initListeners = () => {
  const handleResize = () => {
    forEach(renderedComponents, (renderedComponent) => {
      if (!renderedComponent) {
        return;
      }

      const { rootEl, profileLink } = renderedComponent;

      rootEl.style.width = `${profileLink.offsetWidth}px`;
    });
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
};

let destroyListeneres: (() => void) | null = null;

const tryToRender = () => {
  forEach(playersInfo, (playerInfo) => {
    if (!playerInfo) {
      return;
    }

    const { profileLink, steamId } = playerInfo;

    const holder = profileLink.parentNode as HTMLElement | null;

    const reneredComponentInfo = renderedComponents[steamId];

    if (
      (reneredComponentInfo &&
        document.body.contains(reneredComponentInfo.rootEl)) ||
      !isValidSteamId64(steamId) ||
      !holder
    ) {
      return;
    }

    const rootEl = document.createElement('div');
    const root = createRoot(rootEl);

    rootEl.classList.add(cx('faceit-level-root'));
    rootEl.style.width = `${profileLink.offsetWidth}px`;

    holder.classList.add(cx('external-holder'));
    holder.insertAdjacentElement('afterend', rootEl);

    root.render(
      <Provider store={store}>
        <FaceitLevel steamId={steamId} />
      </Provider>
    );

    renderedComponents[steamId] = {
      root,
      rootEl,
      profileLink,
    };
  });
};

const processPopup = (node: HTMLElement, steamIdAnchor: HTMLAnchorElement) => {
  const nickname = node.querySelector('span')?.textContent;

  if (!nickname) {
    return;
  }

  const playerInfo = playersInfo[nickname];
  const id = getSteamIdFromAnchor(steamIdAnchor);

  if (!playerInfo || !id) {
    return;
  }

  const playerId = playerInfo.steamId;

  playerInfo.steamId = id;

  let containerEl: HTMLElement | Node | null = node;

  while (containerEl && containerEl.parentNode !== document.body) {
    containerEl = containerEl.parentNode;
  }

  if (containerEl && 'style' in containerEl) {
    if (!playerId) {
      containerEl.style.visibility = 'hidden';
      document.documentElement.dispatchEvent(mouseLeaveEvent);
    }
  }

  tryToRender();
};

export const processMatchPage: ProcessFn = (pageInfo, node) => {
  if (!destroyListeneres) {
    destroyListeneres = initListeners();
  }

  const steamIdAnchor = findSteamProfileAnchorNode(node);

  if (steamIdAnchor) {
    processPopup(node as HTMLElement, steamIdAnchor);

    return;
  }

  /**
   * Когда мы наводим на ранг игрока, то появлятеся
   * попап с информацией по игроку, где появляется
   * ссылка с id его steam.
   */
  const playersRankSvgs = document.querySelectorAll('a[href*="/"] svg > svg');

  const oldPlayersInfo = playersInfo;
  playersInfo = {};

  playersRankSvgs.forEach((node) => {
    const profileLink = node.closest<HTMLAnchorElement>('a[href*="/"]');

    if (!profileLink) {
      return;
    }

    const nickname = profileLink.querySelector('span')?.textContent;

    if (!nickname) {
      return;
    }

    const oldPlayerInfo = oldPlayersInfo[nickname];

    if (oldPlayerInfo) {
      oldPlayerInfo.profileLink = profileLink;

      playersInfo[nickname] = oldPlayerInfo;

      tryToRender();

      return;
    }

    playersInfo[nickname] = {
      profileLink,
      steamId: '',
    };

    node.dispatchEvent(mouseEnterEvent);
  });
};

export const unprocessMatchPage = () => {
  renderedComponents = {};
  playersInfo = {};
  destroyListeneres?.();
};
