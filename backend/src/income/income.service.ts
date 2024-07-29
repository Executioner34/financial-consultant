import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateIncomeDto } from './dto/create-income.dto';

@Injectable()
export class IncomeService {
    constructor(private db: DbService) {}

    getIncomes() {
        return this.db.income.findMany();
    }

    getIncome(id: number) {
        return this.db.income.findUnique({
            where: { id },
        });
    }

    createIncome(value: string, date: string, comment: string, category: string) {
        const formatedDate = new Date(date).toISOString();
        return this.db.income.create({
            data: {
                value: Number(value),
                date: formatedDate,
                comment: comment,
                category: category,
            },
        });
    }

    updateIncome(id: number, data: CreateIncomeDto) {
        const formatedDate = new Date(data.date).toISOString();
        return this.db.income.updateMany({
            where: { id },
            data: {
                value: Number(data.value),
                date: formatedDate,
                comment: data.comment,
                category: data.category,
            },
        });
    }

    deleteIncome(id: number) {
        return this.db.income.delete({
            where: { id },
        });
    }
}
