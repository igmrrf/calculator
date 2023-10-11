import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class AcceptedData {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @IsNumber()
  num1: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @IsNumber()
  num2: number;
}
