import { Model, models, model } from 'mongoose';
import { Document, Schema } from 'mongoose';

export interface ProductDocument extends Document {
  productId: string;
  productType: [];
  gender: [];
  productShoeSize: [];
  productSize: [];
  productSizePantsWaist: [];
  productSizePantsInseam: [];
  productDescriptionOptional: string;
  productImage: string;
}

export const ProductSchema = new Schema<ProductDocument>({
        productId: {
               type: String,
               required: true
     },     
        productType: {
               type: [],
               required: false,
            //    enum: [‘Choose’, ‘Shoes’, ‘Long sleeve shirt’],
            //    default: [‘Choose’]
     },
        gender: {
               type: [],
               required: false,
            //    enum: [‘Choose’, ‘Female’, ‘Male’, ‘Non-binary’],
            //    default: ‘Choose’
     },
        productShoeSize: {
               type: [],
               required: false,
            //    enum: [‘Choose’, ‘4 M / 5.5 W’, ‘4.5 M / 6 W’],
            //    default: ‘Choose’
     },
        productSize: {
               type: [],
               required: false,
            //    enum: [‘Choose’, ‘XXS’, ‘XS’],
            //    default: ‘Choose’
     },
        productSizePantsWaist: {
               type: [],
               required: false,
            //    enum: [‘Choose’, ‘28’, ‘29’],
            //    default: ‘Choose’
     },
        productSizePantsInseam: {
               type: [],
               required: false,
            //    enum: [‘Choose’, ‘28’, ‘29’],
            //    default: ‘Choose’
     },
        productDescriptionOptional: {
               type: String,
               required: false,
     }, 
        productImage: {
               type: String,
               required: false,
     }
    });

    const ProductModel = models.Product || model('Product', ProductSchema);
    export default ProductModel as Model<ProductDocument /*{}, Methods*/>;