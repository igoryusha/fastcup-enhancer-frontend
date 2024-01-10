import processFaceitLinks from '@content/processors/processFaceitLinks/processFaceitLinks';

const observer = new MutationObserver((mutationsList, observer) => {
  mutationsList.forEach((mutation) => {
    if (mutation.type !== 'childList') {
      return;
    }

    const addedNodes = mutation.addedNodes;

    addedNodes.forEach((node) => {
      processFaceitLinks(node);
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
