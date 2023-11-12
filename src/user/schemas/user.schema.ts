import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  ADMIN = 'admin',
  CREATOR = 'creator',
  USER = 'user',
}
@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: [true, 'Email already exists'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
