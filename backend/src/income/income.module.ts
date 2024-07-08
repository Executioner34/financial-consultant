import { Module } from '@nestjs/common';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}
