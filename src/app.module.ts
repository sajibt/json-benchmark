import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BenchmarkModule } from './benchmark/benchmark.module';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })

// Module for fetch
@Module({
  imports: [BenchmarkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
