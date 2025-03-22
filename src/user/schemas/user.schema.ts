import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  ADMIN = 'admin',
  CREATOR = 'creator',
  USER = 'user',
}

export enum DegreeType {
  ASSOCIATES = "Associate's",
  BACHELORS = "Bachelor's",
  CERTIFICATE = 'Certificate',
  OTHER = 'Other'
}

export const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const ProductType = [
  "Shoes",
  "Shirts",
  "Pants",
  "Skirt",
  "Jacket/Blazer",
  "Dress",
  "Casual Wear",
  "Suits",
  "Accessories"
];

export const Gender = ['MALE','FEMALE', 'NON_BINARY']

export interface LookingForItem {
  type: string;
  size?: string;
  gender?: string;
}

@Schema({
  timestamps: true,
})

export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ 
    unique: true,
    required: true,
    message: 'Email already exists'
  })
  email: string;

  @Prop({ required: true })
  pronoun: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: Role;

  @Prop({ 
    type: String,
    enum: Object.values(DegreeType),
    default: null,
  })
  degreeType: string;

  @Prop({ 
    type: String,
    default: null,
  })
  major: string;

  @Prop({ 
    type: String,
    enum: Months,
    default: null,
  })
  graduationMonth: string;

  @Prop({ 
    type: String,
    default: null,
  })
  graduationYear: string;

  @Prop({ 
    type: [{ 
      type: { type: String, enum: ProductType },
      size: { type: String },
      gender: { type: String, enum: Gender }
    }],
    default: [],
  })
  lookingFor: LookingForItem[];
}

export const UserSchema = SchemaFactory.createForClass(User);
