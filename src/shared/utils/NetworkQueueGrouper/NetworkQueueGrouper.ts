import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';

interface NetworkQueueGrouperOptions {
  delay: number;
  request: <T extends (...args: any) => any>(
    fetcher: T,
    data: unknown
  ) => PromiseLike<ReturnType<T>>;
}

export class NetworkQueueGrouper {
  queue: unknown[] = [];
  pending = {};
  lastMeasureAt = 0;
  timeoutId: ReturnType<typeof setTimeout> | null = null;

  pendingPromise: Promise<any> | null = null;
  delay: number;

  makeRequest: NetworkQueueGrouperOptions['request'];

  constructor(options: NetworkQueueGrouperOptions) {
    const { delay, request } = options;

    this.delay = delay;
    this.makeRequest = request;
  }

  request<T extends (...args: any) => MaybePromise<any>>(
    fetcher: T,
    data: unknown
  ): MaybePromise<ReturnType<T>> {
    const now = performance.now();

    if (!this.queue.length || now - this.lastMeasureAt > this.delay) {
      this.lastMeasureAt;
    }

    this.queue.push(data);

    if (this.timeoutId && this.pendingPromise) {
      return this.pendingPromise;
    }

    this.pendingPromise = new Promise((resolve) => {
      this.timeoutId = setTimeout(async () => {
        if (!this.queue.length) {
          return;
        }

        const queue = this.queue;

        this.queue = [];
        this.timeoutId = null;
        this.pendingPromise = null;

        const response = await this.makeRequest(fetcher, queue);

        resolve(response);
      }, this.delay);
    });

    return this.pendingPromise;
  }
}
