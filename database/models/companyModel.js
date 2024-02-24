import { Schema, model } from 'mongoose';

const companySchema = new Schema({
  companyName: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  numberOfEmployees: {
    type: String,
    enum: ['1-10', '11-20', '21-50', '51-100', '101+'],
    required: true
  },
  companyEmail: {
    type: String,
    unique: true,
    required: true
  },
  companyHR: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},{timestamps:true});

export const CompanyModel = model('Company', companySchema);


