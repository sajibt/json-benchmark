import { FetchTypeInterface } from './fetch-type.interface';
import { Worker } from 'worker_threads';
import * as path from 'path';

export class WorkerFetch implements FetchTypeInterface {
  async fetchData(urls: string[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      // Resolve path to worker.js
      const workerPath = path.resolve(__dirname, 'worker.js');
      console.log(`Worker path resolved to: ${workerPath}`);

      const worker = new Worker(workerPath, { workerData: urls });

      worker.on('message', (results) => resolve(results));
      worker.on('error', (err) => reject(err));
    });
  }
}
