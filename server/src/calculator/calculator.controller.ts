import { CalculatorService } from './calculator.service';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { AcceptedData } from './calculator.types';
import Calculator from './entities/calculator.entity';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}
  @Post('add')
  add(@Body() data: AcceptedData): Promise<number> {
    return this.calculatorService.add(data);
  }

  @Post('subtract')
  subtract(@Body() data: AcceptedData): Promise<number> {
    return this.calculatorService.subtract(data);
  }

  @Post('multiply')
  multiply(@Body() data: AcceptedData): Promise<number> {
    return this.calculatorService.multiply(data);
  }

  @Post('divide')
  divide(@Body() data: AcceptedData): Promise<number> {
    return this.calculatorService.divide(data);
  }

  @Get('history')
  history(): Promise<Calculator[]> {
    return this.calculatorService.getHistory();
  }
}
