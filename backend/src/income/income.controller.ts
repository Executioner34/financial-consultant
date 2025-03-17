import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Incomes')
@Controller('incomes')
export class IncomeController {
    constructor(private readonly incomeService: IncomeService) {}

    @ApiOperation({ summary: 'Add income' })
    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() body: CreateIncomeDto) {
        return this.incomeService.createIncome(body);
    }

    @ApiOperation({ summary: 'Return all incomes' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return this.incomeService.findAllIncomes();
    }

    @ApiOperation({ summary: 'Return one income' })
    @ApiParam({ name: 'id', required: true })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getOne(@Param('id') id: string) {
        const item = await this.incomeService.findOneIncome(Number(id));
        if (!item) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return item;
    }

    @ApiOperation({ summary: 'Update income' })
    @ApiParam({ name: 'id', required: true })
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() body: UpdateIncomeDto) {
        const item = await this.incomeService.updateIncome(Number(id), body);
        if (!item.count) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return item;
    }

    @ApiOperation({ summary: 'Delete income' })
    @Delete(':id')
    @ApiParam({ name: 'id', required: true })
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string) {
        const item = await this.incomeService.deleteIncome(Number(id));
        if (!item) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return item;
    }
}
