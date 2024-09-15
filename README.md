# JSON Benchmark

## Overview

JSON Benchmark is a tool for measuring the performance of different fetching strategies in your application. It supports sequential fetching, concurrent fetching with `Promise.all`, and fetching with worker threads. This tool is useful for comparing performance metrics and optimizing your application's data retrieval processes.

## Project Structure

src
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── benchmark
│   ├── benchmark.controller.ts
│   ├── benchmark.module.ts
│   ├── benchmark.service.ts
│   ├── concurrent-fetch.ts
│   ├── fetch-type.enum.ts
│   ├── fetch-type.interface.ts
│   ├── sequential-fetch.ts
│   ├── worker-fetch.ts
│   └── worker.js
└── main.ts


## Usage

You can run different benchmarks to test various fetching strategies. Here’s how to use them:

### Sequential Fetch

Perform a sequential fetch of benchmark data:

GET /benchmark?type=sequential

### Concurrent Fetch

Perform a concurrent fetch of benchmark data using Promise.all:
GET /benchmark?type=concurrent

### Worker Thread Fetch

Perform a fetch of benchmark data using worker threads:
GET /benchmark?type=worker
