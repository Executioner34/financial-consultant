import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class ExpenseService {
    constructor(private db: DbService) {}

    createExpense(data: CreateExpenseDto) {
        const formatedDate = new Date(data.date).toISOString();
        return this.db.expense.create({
            data: {
                value: Number(data.value),
                date: formatedDate,
                comment: data.comment,
                category: data.category,
            },
        });
    }

    findAllExpenses() {
        return this.db.expense.findMany();
    }

    findOneExpense(id: number) {
        return this.db.expense.findUnique({
            where: { id },
        });
    }

    updateExpense(id: number, data: UpdateExpenseDto) {
        const formatedDate = new Date(data.date).toISOString();
        return this.db.expense.updateMany({
            where: { id },
            data: {
                value: Number(data.value),
                date: formatedDate,
                comment: data.comment,
                category: data.category,
            },
        });
    }

    removeExpense(id: number) {
        return this.db.expense.delete({
            where: { id },
        });
    }
}
