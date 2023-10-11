import { ObjectId } from 'mongoose';
import { OPERATIONS } from './calculator.types';

class Calculator {
  _id?: ObjectId;

  parameters: string[];
  result: number;
  operation: OPERATIONS;
  address: string;

  getPublicFields() {
    return {
      _id: this._id,
      parameters: this.parameters,
      result: this.result,
      operation: this.operation,
    };
  }
}

export default Calculator;
