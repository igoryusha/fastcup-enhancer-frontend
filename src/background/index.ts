import { FASTCUP_BASE_ORIGIN } from '@shared/constants/FASTCUP_BASE_ORIGIN';

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  chrome.tabs.sendMessage(details.tabId, {
    url: details.url,
  });
});

chrome.webNavigation.onCompleted.addListener((details) => {
  const url = new URL(details.url);

  if (!url.origin.endsWith(FASTCUP_BASE_ORIGIN)) {
    return;
  }

  chrome.tabs.sendMessage(details.tabId, {
    url: details.url,
  });
});
