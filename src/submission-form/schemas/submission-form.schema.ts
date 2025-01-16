import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class SubmissionForm extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true, unique: true }) // Ensure email is unique
  email: string;

  @Prop({ required: true })
  size: string;
}

export const SubmissionFormSchema =
  SchemaFactory.createForClass(SubmissionForm);
