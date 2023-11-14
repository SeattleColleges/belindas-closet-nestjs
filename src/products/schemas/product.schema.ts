import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({
    timestamps: true,
    collection: 'products'
})


export class Product extends Document {
    @Prop ({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    })
    createByUserID: string;

    @Prop()
    productType: [];

    @Prop()
    gender: [];

    @Prop()
    productShoeSize: [];

    @Prop()
    productSize: [];

    @Prop()
    productSizePantsWaist: [];

    @Prop()
    productSizePantsInseam: [];

    @Prop()
    productDescriptionOptional: string;

    @Prop()
    productImage: string;

    @Prop({ default: false })
    isHidden: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);