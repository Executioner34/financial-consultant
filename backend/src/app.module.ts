import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { IncomeModule } from './income/income.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
    imports: [DbModule, IncomeModule, ExpenseModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
