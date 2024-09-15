import { FetchTypeInterface } from './fetch-type.interface';

/**
 * SequentialFetch class implements FetchTypeInterface.
 * It fetches data sequentially for each URL. This means that each request is made only after the previous one has completed.
 */

export class SequentialFetch implements FetchTypeInterface {
  async fetchData(urls: string[]): Promise<any[]> {
    const results = [];
    for (const url of urls) {
      const response = await fetch(url);
      const data = await response.json();
      results.push(data);
    }
    return results;
  }
}
