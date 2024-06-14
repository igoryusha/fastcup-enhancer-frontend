import { getPageInfo, PageInfo, PageName } from './getPageInfo';

export { PageInfo, PageName } from './getPageInfo';

export type ProcessFn = (pageInfo: PageInfo, node: Node | HTMLElement) => void;

export type UnprocessFn = () => void;

interface Processor {
  pageName: PageName;
  process: ProcessFn;
  unprocess?: UnprocessFn;
}

let lastProcessors: Processor[] = [];

const groupedProcessors: Partial<Record<PageName, Processor[]>> = {};

const observer = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    const pageInfo = getPageInfo();

    const { pageName } = pageInfo;

    if (mutation.type !== 'childList') {
      return;
    }

    const addedNodes = mutation.addedNodes;

    const processors = groupedProcessors[pageName];

    if (!processors) {
      return;
    }

    addedNodes.forEach((node) => {
      if (processors !== lastProcessors) {
        lastProcessors.forEach(({ unprocess }) => {
          unprocess?.();
        });
      }

      processors.forEach(({ process }) => {
        process(pageInfo, node);
      });

      lastProcessors = processors;
    });
  });
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

export const Observer = {
  registerProcessor(processor: Processor) {
    const { pageName } = processor;

    groupedProcessors[pageName] ||= [];
    groupedProcessors[pageName]!.push(processor);

    return this;
  },
};
