import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { IncomeModule } from './income/income.module';

@Module({
  imports: [DbModule, IncomeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
