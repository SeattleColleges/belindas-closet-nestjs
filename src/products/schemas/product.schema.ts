import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "../../user/schemas/user.schema";
import {ProductType, ProductGender, ProductSizes, ShoeSize, PantsSize} from "../enums"

@Schema({ timestamps: true, collection: "products" })

export class Product extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    createdByUser: User;
  
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    updatedByUser: User;
  
    @Prop({ type: String, enum: ProductType, required: true })
    productType: ProductType;
  
    @Prop({ type: String, enum: ProductGender, required: false })
    productGender?: ProductGender;
  
    @Prop({ type: Number, enum: ShoeSize, required: false, default: null })
    productSizeShoe?: ShoeSize | null;
  
    // Removed the "enum: ProductSizes" constraint because it was causing an error
    // Need to explore this further in the future
    @Prop({ type: String, required: false, default: null })
    // @Prop({ type: String, enum: ProductSizes, required: false, default: null })
    productSizes?: ProductSizes | null;
  
    @Prop({ type: Number, enum: PantsSize, required: false, default: null })
    productSizePantsWaist?: PantsSize | null;
  
    @Prop({ type: Number, enum: PantsSize, required: false, default: null })
    productSizePantsInseam?: PantsSize | null;
  
    @Prop({ type: String, required: false })
    productDescription?: string;
  
    @Prop({ type: String, required: false })
    productImage?: string;
  
    @Prop({ type: Boolean, default: false })
    isHidden: boolean;
  
    @Prop({ type: Boolean, default: false })
    isSold: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);