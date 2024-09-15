import { Controller, Get, Query } from '@nestjs/common';
import { BenchmarkService } from './benchmark.service';
import { FetchType } from './fetch-type.enum';

@Controller('benchmark')
export class BenchmarkController {
  constructor(private readonly benchmarkService: BenchmarkService) {}

  @Get()
  async runBenchmark(@Query('type') type: string) {
    const fetchType = (type as FetchType) || FetchType.SEQUENTIAL;
    this.benchmarkService.setFetchStrategy(fetchType);
    return await this.benchmarkService.fetchDataFromSources();
  }
}
