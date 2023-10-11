import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({
    timestamps: true,
    collection: 'products'
})


export class Product {
    @Prop ({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    })
    createByUserID: string;

    @Prop()
    productId: string;

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
}

export const ProductSchema = SchemaFactory.createForClass(Product);