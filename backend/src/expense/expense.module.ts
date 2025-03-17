import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { DbModule } from '../db/db.module';

@Module({
    imports: [DbModule],
    controllers: [ExpenseController],
    providers: [ExpenseService],
})
export class ExpenseModule {}
