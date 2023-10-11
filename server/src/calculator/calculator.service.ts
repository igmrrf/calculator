import { Inject, Injectable, Scope } from '@nestjs/common';
import { AcceptedData } from './calculator.types';
import { InjectModel } from '@nestjs/mongoose';
import Calculator from './entities/calculator.entity';
import { Model } from 'mongoose';
import { CreateCalculationDTO } from './dto/create.calculation.dto';
import { OPERATIONS } from './entities/calculator.types';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class CalculatorService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectModel(Calculator.name)
    private readonly calculatorModel: Model<Calculator>,
  ) {}

  async add(data: AcceptedData): Promise<number> {
    const { num1, num2 } = data;
    const result: number = data.num1 + data.num2;

    await this.save({
      result,
      operation: OPERATIONS.add,
      parameters: [num1.toString(), '+', num2.toString()],
    });
    return result;
  }

  async subtract(data: AcceptedData): Promise<number> {
    const { num1, num2 } = data;

    const result: number = data.num1 - data.num2;
    await this.save({
      result,
      operation: OPERATIONS.subtract,
      parameters: [num1.toString(), '-', num2.toString()],
    });
    return result;
  }

  async multiply(data: AcceptedData): Promise<number> {
    const { num1, num2 } = data;
    const result: number = num1 * num2;
    await this.save({
      result,
      operation: OPERATIONS.multiply,
      parameters: [num1.toString(), 'x', num2.toString()],
    });
    return result;
  }

  async divide(data: AcceptedData): Promise<number> {
    const { num1, num2 } = data;
    if (num2 === 0) {
      throw new Error('Division by zero is not allowed.');
    }
    const result: number = num1 / num2;
    await this.save({
      result,
      operation: OPERATIONS.divide,
      parameters: [num1.toString(), '/', num2.toString()],
    });
    return result;
  }

  async save(data: CreateCalculationDTO) {
    console.log({ env: process.env.NODE_ENV });
    const address = this.request['ip'];
    const calculation = await this.calculatorModel.create({ ...data, address });
    return calculation;
  }

  async getHistory(): Promise<Calculator[]> {
    console.log({ env: process.env.NODE_ENV });
    const address = this.request['ip'];
    const calculations = await this.calculatorModel.find({
      address,
    });
    return calculations;
  }
}
