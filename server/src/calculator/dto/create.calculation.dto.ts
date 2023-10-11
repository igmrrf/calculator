import { PartialType } from '@nestjs/mapped-types';
import Calculator from '../entities/calculator.entity';

export class CreateCalculationDTO extends PartialType(Calculator) {}
