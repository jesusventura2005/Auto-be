import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Maintenance extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Car', required: true, trim: true })
  carId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true, trim: true })
  type: string;

  @Prop({ required: true, trim: true })
  date: Date;

  @Prop({ required: true, trim: true })
  kilometers: number;

  @Prop({ required: true, trim: true })
  completed: boolean;
}

export const MaintenanceSchema = SchemaFactory.createForClass(Maintenance);
