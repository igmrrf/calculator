import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OPERATIONS } from './calculator.types';
// import Quondam from './QuondamEntity';

export type QuondamDocument = HydratedDocument<Calculator>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Calculator {
  @Prop()
  parameters: string[];

  @Prop()
  result: number;

  @Prop()
  address: string;

  @Prop()
  operation: OPERATIONS;

  @Prop()
  is_deleted?: boolean;
}

export const CalculatorSchema = SchemaFactory.createForClass(Calculator);
