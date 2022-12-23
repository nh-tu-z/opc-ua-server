import { Schema, model } from 'mongoose';
import { IUAVariable } from '../../interfaces/db-documents';

// UA Variable
const uaVariableSchema = new Schema<IUAVariable>({
    browseName: { type: String, required: true },
    componentOf: { type: Number, required: true },
    description: { type: String, required: true },
    dataType : { type: Number, required: true }
  });
  
export const UAVariable = model<IUAVariable>('UAVariable', uaVariableSchema);