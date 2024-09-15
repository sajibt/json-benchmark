import { workerData, parentPort } from 'worker_threads';

async function fetchData(urls: string[]): Promise<any[]> {
  const results = [];
  for (const url of urls) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      results.push(data);
    } catch (error) {
      results.push({ error: error.message });
    }
  }
  return results;
}

// Start fetching data and send results to parent thread
fetchData(workerData)
  .then((results) => {
    parentPort?.postMessage(results);
  })
  .catch((err) => {
    parentPort?.postMessage({ error: err.message });
  });
