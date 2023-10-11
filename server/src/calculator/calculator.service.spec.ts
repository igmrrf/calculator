import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from './calculator.service';
import { getModelToken } from '@nestjs/mongoose';
import Calculator from './entities/calculator.entity';
import { REQUEST } from '@nestjs/core';

describe('CalculatorService', () => {
  let service: CalculatorService;
  const mockCalculation = {
    address: '::1',
    created_at: '2023-10-10T23:52:01.216Z',
    operation: 'subtract',
    parameters: ['70', '-', '4'],
    result: 66,
    updated_at: '2023-10-10T23:52:01.216Z',
    _id: '6525e3a181efa595534be724',
  };
  const mockCalculations = [mockCalculation];
  const mockCalculatorModelFunctions = {
    create: jest.fn((data) => Promise.resolve(data)),
    find: jest.fn(() => Promise.resolve(mockCalculations)),
  };
  const mockRequest = {
    ip: '::1',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalculatorService,
        {
          provide: getModelToken(Calculator.name),
          useValue: mockCalculatorModelFunctions,
        },
        {
          provide: REQUEST,
          useValue: mockRequest,
        },
      ],
    }).compile();

    service = await module.resolve(CalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add two numbers', async () => {
    const result = await service.add({ num1: 5, num2: 3 });
    expect(result).toBe(8);
  });

  it('should subtract two numbers', async () => {
    const result = await service.subtract({ num1: 5, num2: 3 });
    expect(result).toBe(2);
  });

  it('should multiply two numbers', async () => {
    const result = await service.multiply({ num1: 5, num2: 3 });
    expect(result).toBe(15);
  });

  it('should divide two numbers', async () => {
    const result = await service.divide({ num1: 6, num2: 2 });
    expect(result).toBe(3);
  });

  it('get calculation history', async () => {
    const result = await service.getHistory();
    expect(result).toBeTruthy();
  });

  it('should throw an error for division by zero', async () => {
    await expect(service.divide({ num1: 5, num2: 0 })).rejects.toThrowError(
      'Division by zero is not allowed.',
    );
  });
});
