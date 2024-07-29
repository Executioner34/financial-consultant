import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';

@Controller('incomes')
export class IncomeController {
    constructor(private readonly incomeService: IncomeService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() body: CreateIncomeDto) {
        await this.incomeService.createIncome(body.value, body.date, body.comment, body.category);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return this.incomeService.getIncomes();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getOne(@Param('id') id: string) {
        const data = await this.incomeService.getIncome(Number(id));
        if (data) {
            return data;
        }
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() body: CreateIncomeDto) {
        const data = await this.incomeService.updateIncome(Number(id), body);
        if (data) {
            return data;
        }
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string) {
        const data = await this.incomeService.deleteIncome(Number(id));
        if (data) {
            return data;
        }
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
}
