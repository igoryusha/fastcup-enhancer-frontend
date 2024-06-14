export const i18n = (message: string) => {
  return chrome.i18n.getMessage(message);
};
