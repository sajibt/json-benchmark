import { Injectable } from '@nestjs/common';
import { FetchTypeInterface } from './fetch-type.interface';
import { SequentialFetch } from './sequential-fetch';
import { ConcurrentFetch } from './concurrent-fetch';
import { WorkerFetch } from './worker-fetch';
import { FetchType } from './fetch-type.enum';

@Injectable()
export class BenchmarkService {
  private fetchStrategy: FetchTypeInterface;

  /**
   * Sets the fetch strategy based on the type provided.
   * @param type The type of fetch strategy to use (CONCURRENT, WORKER, SEQUENTIAL).
   */

  setFetchStrategy(type: FetchType) {
    switch (type) {
      case FetchType.CONCURRENT:
        this.fetchStrategy = new ConcurrentFetch();
        break;
      case FetchType.WORKER:
        this.fetchStrategy = new WorkerFetch();
        break;
      case FetchType.SEQUENTIAL:
      default:
        this.fetchStrategy = new SequentialFetch();
        break;
    }
  }

  /**
   * Fetches data from a list of sources using the current fetch strategy.
   * Logs the time taken for the fetch operation.
   * @returns The results of the fetch operation.
   */

  async fetchDataFromSources() {
    // List of demo api sources
    const urls = [
      'https://jsonplaceholder.typicode.com/posts',
      'https://jsonplaceholder.typicode.com/posts',
      'https://jsonplaceholder.typicode.com/posts',
      'https://jsonplaceholder.typicode.com/posts',
      'https://jsonplaceholder.typicode.com/posts',
      'https://jsonplaceholder.typicode.com/posts',
      'https://jsonplaceholder.typicode.com/posts',
      'https://jsonplaceholder.typicode.com/posts',
    ];

    // Start timer for benchmark
    console.log(`Running ${this.fetchStrategy.constructor.name} benchmark...`);
    console.time('Benchmark Fetch Time');

    const results = await this.fetchStrategy.fetchData(urls);

    // End timer and log the result
    console.timeEnd('Benchmark Fetch Time');

    return results;
  }
}
