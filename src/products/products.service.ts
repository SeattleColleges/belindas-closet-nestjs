import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
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
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      product,
      { new: true },
    );
    if (!updatedProduct || updatedProduct === null) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return updatedProduct;
  }

  async delete(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    if (!deletedProduct || deletedProduct === null) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return deletedProduct;
  }
}
