import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';

describe('CalculatorController', () => {
  let controller: CalculatorController;
  const mockCalculatorServices = {
    add: jest.fn(() => Promise.resolve(8)),
    subtract: jest.fn(() => Promise.resolve(2)),
    multiply: jest.fn(() => Promise.resolve(15)),
    divide: jest.fn(() => Promise.resolve(3)),
    getHistory: jest.fn(() => Promise.resolve([])),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculatorController],
      providers: [
        {
          provide: CalculatorService,
          useValue: mockCalculatorServices,
        },
      ],
    }).compile();

    controller = module.get<CalculatorController>(CalculatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add two numbers', async () => {
    const result = await controller.add({ num1: 5, num2: 3 });
    expect(result).toBe(8);
  });

  it('should subtract two numbers', async () => {
    const result = await controller.subtract({ num1: 5, num2: 3 });
    expect(result).toBe(2);
  });

  it('should multiply two numbers', async () => {
    const result = await controller.multiply({ num1: 5, num2: 3 });
    expect(result).toBe(15);
  });

  it('should divide two numbers', async () => {
    const result = await controller.divide({ num1: 6, num2: 2 });
    expect(result).toBe(3);
  });

  it('should return history', async () => {
    const result = await controller.history();
    expect(result).toBeTruthy();
  });
});
