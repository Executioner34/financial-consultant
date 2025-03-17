import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Expenses')
@Controller('expenses')
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService) {}

    @ApiOperation({ summary: 'Add expense' })
    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() body: CreateExpenseDto) {
        return this.expenseService.createExpense(body);
    }

    @ApiOperation({ summary: 'Get all expenses' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return this.expenseService.findAllExpenses();
    }

    @ApiOperation({ summary: 'Get one expense' })
    @ApiParam({ name: 'id', required: true })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string) {
        const item = await this.expenseService.findOneExpense(Number(id));
        if (!item) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return item;
    }

    @ApiOperation({ summary: 'Update expense' })
    @ApiParam({ name: 'id', required: true })
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() body: UpdateExpenseDto) {
        const item = await this.expenseService.updateExpense(Number(id), body);
        if (!item.count) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return item;
    }

    @ApiOperation({ summary: 'Delete expense' })
    @ApiParam({ name: 'id', required: true })
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string) {
        const item = await this.expenseService.removeExpense(Number(id));
        console.log(item);
        if (!item) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return item;
    }
}
