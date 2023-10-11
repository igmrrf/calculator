import { Module } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CalculatorController } from './calculator.controller';
import { MongooseModule } from '@nestjs/mongoose';
import Calculator from './entities/calculator.entity';
import { CalculatorSchema } from './entities/calculator.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Calculator.name, schema: CalculatorSchema },
    ]),
  ],
  controllers: [CalculatorController],
  providers: [CalculatorService],
})
export class CalculatorModule {}
