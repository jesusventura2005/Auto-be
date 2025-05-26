import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  age: number;
  @Prop({ required: true, trim: true })
  owner: string;
  @Prop({ required: true, trim: true, unique: true })
  plate: string;
  @Prop({ required: false })
  maintenance: [
    {
      type: string;
      description: string;
      date: Date;
    },
  ];
}

export const carSchema = SchemaFactory.createForClass(Car);
