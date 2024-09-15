import { FetchTypeInterface } from './fetch-type.interface';

/**
 * ConcurrentFetch class implements FetchTypeInterface.
 * It fetches data concurrently by creating a promise for each URL and waits for all promises to complete using Promise.all.
 */

export class ConcurrentFetch implements FetchTypeInterface {
  async fetchData(urls: string[]): Promise<any[]> {
    const fetchPromises = urls.map((url) =>
      fetch(url).then((res) => res.json()),
    );
    return Promise.all(fetchPromises);
  }
}
