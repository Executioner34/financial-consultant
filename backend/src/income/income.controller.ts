import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto, UpdateIncomeDto } from './dto/create-income.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Incomes')
@Controller('incomes')
export class IncomeController {
    constructor(private readonly incomeService: IncomeService) {}

    @ApiOperation({ summary: 'Add income' })
    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() body: CreateIncomeDto) {
        await this.incomeService.createIncome(body.value, body.date, body.comment, body.category);
    }

    @ApiOperation({ summary: 'Return all incomes' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return this.incomeService.getIncomes();
    }

    @ApiOperation({ summary: 'Return one income' })
    @ApiParam({ name: 'id', required: true })
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getOne(@Param('id') id: string) {
        const data = await this.incomeService.getIncome(Number(id));
        if (data) {
            return data;
        }
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    @ApiOperation({ summary: 'Update income' })
    @ApiParam({ name: 'id', required: true })
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() body: UpdateIncomeDto) {
        const data = await this.incomeService.updateIncome(Number(id), body);
        if (data.count) {
            return data;
        }
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    @ApiOperation({ summary: 'Delete income' })
    @Delete(':id')
    @ApiParam({ name: 'id', required: true })
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string) {
        const data = await this.incomeService.deleteIncome(Number(id));
        if (data) {
            return data;
        }
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
}
