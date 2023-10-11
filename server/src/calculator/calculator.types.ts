import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class AcceptedData {
  @IsNotEmpty()
  @IsNumberString()
  @IsNumber()
  num1: number;

  @IsNotEmpty()
  @IsNumberString()
  @IsNumber()
  num2: number;
}
