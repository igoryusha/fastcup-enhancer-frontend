export enum PageName {
  MATCH_PAGE = 'match_page',
  PLAYER_PAGE = 'player_page',

  UNKOWN_PAGE = 'unkown',
}

export interface PageInfo {
  id: string;
  pageName: PageName;
}

const getPathname = (): string[] => {
  return location.pathname.slice(1).split('/');
};

const isMatchPage = (pathname: string[]): boolean => {
  return Boolean(pathname[0] === 'matches' && pathname[1]);
};

const isPlayerPage = (pathname: string[]): boolean => {
  if (!pathname[0]) {
    return false;
  }

  const copyButton = document.querySelector('button[data-clipboard-text]');
  const container = copyButton?.parentNode?.parentNode;

  return Boolean(container?.textContent?.startsWith('ID'));
};

let pathname = getPathname();
let pathnameString = location.pathname;

export const getPageInfo = (): PageInfo => {
  if (pathnameString !== location.pathname) {
    pathname = getPathname();
    pathnameString = location.pathname;
  }

  /**
   * Мы не можем закешировать это значение, так как
   * когда собирается страница, у нас еще нет верстки
   * и мы запомним по location неправильный путь.
   */
  let pageInfo: PageInfo;

  switch (true) {
    case isMatchPage(pathname):
      pageInfo = {
        id: pathname[1],
        pageName: PageName.MATCH_PAGE,
      };
      break;

    case isPlayerPage(pathname):
      pageInfo = {
        id: pathname[0],
        pageName: PageName.PLAYER_PAGE,
      };
      break;

    default:
      pageInfo = {
        id: '',
        pageName: PageName.UNKOWN_PAGE,
      };
  }

  return pageInfo;
};
