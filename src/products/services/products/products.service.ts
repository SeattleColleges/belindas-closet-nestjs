import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from 'src/products/types/products.model'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
  ) {}

  async create(
    productId: string,
    productType: [],
    gender: [],
    productShoeSize: [],
    productSize: [],
    productSizePantsWaist: [],
    productSizePantsInseam: [],
    productDescriptionOptional: string,
    productImage: string,
    ): Promise<any> {
    const newProduct = new this.productModel({
      productId,
      productType,
      gender,
      productShoeSize,
      productSize,
      productSizePantsWaist,
      productSizePantsInseam,
      productDescriptionOptional,
      productImage,
    });
    const result = await newProduct.save();
    return result._id;
  }

  async findAll(): Promise<ProductDocument[]> {
    const products = await this.productModel.find().exec();
    if (!products || products.length === 0) {
      throw new NotFoundException('No products found');
    }
    return products;
  }

  async findOne(id: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(id).exec();
    if (!product || product === null) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return {
      productId: product.productId,
      productType: product.productType,
      gender: product.gender,
      productShoeSize: product.productShoeSize,
      productSize: product.productSize,
      productSizePantsWaist: product.productSizePantsWaist,
      productSizePantsInseam: product.productSizePantsInseam,
      productDescriptionOptional: product.productDescriptionOptional,
      productImage: product.productImage,
    } as ProductDocument;
  }

  async updateProduct(
    id: string, 
    productId: string,
    productType: [],
    gender: [],
    productShoeSize: [],
    productSize: [],
    productSizePantsWaist: [],
    productSizePantsInseam: [],
    productDescriptionOptional: string,
    productImage: string,
    ) {
    const updatedProduct = await this.productModel.findById(id).exec();
    if (!updatedProduct || updatedProduct === null) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    if (productId) {
      console.log('productId ', productId);
      updatedProduct.productId = productId;
    }
    if (productType) {
      console.log('productType ', productType);
      updatedProduct.productType = productType;
    }
    if (gender) {
      console.log('gender ', gender);
      updatedProduct.gender = gender;
    }
    if (productShoeSize) {
      console.log('productShoeSize ', productShoeSize);
      updatedProduct.productShoeSize = productShoeSize;
    }
    if (productSize) {
      console.log('productSize ', productSize);
      updatedProduct.productSize = productSize;
    }
    if (productSizePantsWaist) {
      console.log('productSizePantsWaist ', productSizePantsWaist);
      updatedProduct.productSizePantsWaist = productSizePantsWaist;
    }
    if (productSizePantsInseam) {
      console.log('productSizePantsInseam ', productSizePantsInseam);
      updatedProduct.productSizePantsInseam = productSizePantsInseam;
    }
    if (productDescriptionOptional) {
      console.log('productDescriptionOptional ', productDescriptionOptional);
      updatedProduct.productDescriptionOptional = productDescriptionOptional;
    }
    if (productImage) {
      console.log('productImage ', productImage);
      updatedProduct.productImage = productImage;
    }
    const updated = await updatedProduct.save();
    console.log(updated);
    return updated;
  }
}

// we will more than likely change this delete function to an update sort of like a soft-delete. ex. isDeleted = true

//   async delete(id: string): Promise<Product> {
//     const deletedProduct = await this.productModel.findByIdAndDelete(id);
//     if (!deletedProduct || deletedProduct === null) {
//       throw new NotFoundException(`Product ${id} not found`);
//     }
//     return deletedProduct;
//   }
// }
