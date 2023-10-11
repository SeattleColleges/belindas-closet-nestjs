import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
export class ProductsService {
  constructor(
    @InjectModel('Product') private productModel: Model<Product>,
  ) {}

  async createProduct(product: Product): Promise<Product> {
    const newProduct = Object.assign(product);
    return await this.productModel.create(newProduct);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    if (!products || products.length === 0) {
      throw new NotFoundException('No products found');
    }
    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product || product === null) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async updateProduct(id: string, product: Product): Promise<Product> {
    // update product
    if (!product || product === null) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    }).exec();
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
