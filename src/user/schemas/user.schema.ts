import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  ADMIN = 'admin',
  CREATOR = 'creator',
  USER = 'user',
}

export enum DegreeType {
  ASSOCIATES = 'Associates',
  BACHELORS = 'Bachelors',
  CERTIFICATE = 'Certificate',
  OTHER = 'Other'
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
  pronoun: string;

  @Prop()
  password: string;

  @Prop()
  role: Role;

  @Prop({ enum: DegreeType })
  degreeType: DegreeType;

  @Prop()
  major: string;

  @Prop()
  graduationMonth: string;

  @Prop()
  graduationYear: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
