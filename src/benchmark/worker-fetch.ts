import { FetchTypeInterface } from './fetch-type.interface';
import { Worker } from 'worker_threads';
import * as os from 'os';
import * as path from 'path';

export class WorkerFetch implements FetchTypeInterface {
  async fetchData(urls: string[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const workerPath = path.resolve(__dirname, 'worker.js');
      const numCores = os.cpus().length; // Get the number of CPU cores
      console.log(`Total CPU cores available: ${numCores}`);

      //  Fixed workers than we have URLs to process
      const numWorkers = Math.min(numCores, urls.length); // Don't create more workers than URLs
      console.log(
        `Creating ${numWorkers} workers to process ${urls.length} URLs`,
      );

      const chunkSize = Math.ceil(urls.length / numWorkers);
      const results: any[] = [];
      let completedWorkers = 0;

      if (urls.length === 0) {
        // If no URLs, immediately resolve with empty results
        resolve(results);
        return;
      }

      for (let i = 0; i < numWorkers; i++) {
        const urlChunk = urls.slice(i * chunkSize, (i + 1) * chunkSize); // Get the chunk of URLs for the worker
        if (urlChunk.length === 0) break; // No more chunks to process

        console.log(
          `Creating worker ${i + 1} to process ${urlChunk.length} URLs`,
        );

        const worker = new Worker(workerPath, { workerData: urlChunk });

        worker.on('message', (workerResults) => {
          results.push(...workerResults); // Add worker results to the final results array
          completedWorkers++;
          console.log(
            `Worker ${i + 1} completed. Total completed workers: ${completedWorkers}/${numWorkers}`,
          );

          if (completedWorkers === numWorkers) {
            console.log('All workers have completed.');
            resolve(results); // Resolve when all workers have completed
          }
        });

        worker.on('error', (err) => {
          console.error(`Worker ${i + 1} encountered an error:`, err);
          reject(err);
        });
      }
    });
  }
}
