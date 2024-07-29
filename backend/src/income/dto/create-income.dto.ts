import { ApiProperty } from '@nestjs/swagger';

export class CreateIncomeDto {
    @ApiProperty({
        example: '1000',
    })
    value: string;

    @ApiProperty({
        example: new Date(),
    })
    date: string;

    @ApiProperty({
        example: 'comment',
    })
    comment?: string;

    @ApiProperty({
        example: 'Продукты',
    })
    category?: string;
}

export class UpdateIncomeDto extends CreateIncomeDto {}
