import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Car extends Document {
  @Prop({ required: true, trim: true })
  type: string;
  @Prop({ required: true, trim: true })
  brand: string;
  @Prop({ required: true, trim: true })
  carModel: string;
  @Prop({ required: true, trim: true })
  year: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, trim: true })
  owner: mongoose.Types.ObjectId;
  @Prop({ required: true, trim: true, unique: true })
  plate: string;
  @Prop({ required: true })
  serial: string;
  @Prop({ type: Types.ObjectId, ref: 'Maintenance', default: [] })
  maintenance: Types.ObjectId[];
}

export const carSchema = SchemaFactory.createForClass(Car);
