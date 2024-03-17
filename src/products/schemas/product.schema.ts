import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/user/schemas/user.schema";

@Schema({
    timestamps: true,
    collection: 'products'
})


export class Product extends Document {
    @Prop ({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    })
    createdByUser: User;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    })
    updatedByUser: User;

    @Prop()
    productType: [];

    @Prop()
    productGender: [];

    @Prop()
    productSizeShoe: [];

    @Prop()
    productSizes: [];

    @Prop()
    productSizePantsWaist: [];

    @Prop()
    productSizePantsInseam: [];

    @Prop()
    productDescription: string;

    @Prop()
    productImage: string;

    @Prop({ default: false })
    isHidden: boolean;

    @Prop({ default: false })
    isSold: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);