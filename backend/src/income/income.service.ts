import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Injectable()
export class IncomeService {
    constructor(private db: DbService) {}

    findAllIncomes() {
        return this.db.income.findMany();
    }

    findOneIncome(id: number) {
        return this.db.income.findUnique({
            where: { id },
        });
    }

    createIncome(data: CreateIncomeDto) {
        const formatedDate = new Date(data.date).toISOString();
        return this.db.income.create({
            data: {
                value: Number(data.value),
                date: formatedDate,
                comment: data.comment,
                category: data.category,
            },
        });
    }

    updateIncome(id: number, data: UpdateIncomeDto) {
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
