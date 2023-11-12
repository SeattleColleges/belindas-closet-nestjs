import { Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';

export class ProductsService {

  private readonly logger = new Logger;
  SERVICE: string = ProductsService.name;
  
  constructor(
    @InjectModel('Product') private productModel: Model<Product>,
  ) { }

  async createProduct(product: Product): Promise<Product> {
    this.logger.log(`Creating Product: ${JSON.stringify(product, null, '\t')}`, this.SERVICE);
    const newProduct = Object.assign(product);
    return await this.productModel.create(newProduct);
  }

  async findAll(): Promise<Product[]> {
    this.logger.log(`Finding all Products`, this.SERVICE);
    const products = await this.productModel.find().exec();
    if (!products || products.length === 0) {
      this.logger.warn('Products not found', this.SERVICE);
      throw new NotFoundException('No products found');
    }
    return products;
  }

  async findOne(id: string): Promise<Product> {
    this.logger.log(`Finding Product with id: ${id}`, this.SERVICE);
    const product = await this.productModel.findById(id).exec();
    if (!product || product === null) {
      this.logger.warn('Product not found')
      throw new NotFoundException(`Product ${id} not found`, this.SERVICE);
    }
    this.logger.log(`Product found: ${JSON.stringify(product, null, '\t')}`, this.SERVICE);
    return product;
  }

  async updateProduct(id: string, product: Product): Promise<Product> {
    this.logger.log(
      `Updating Product with id: ${id} with: ${JSON.stringify(product, null, '\t')}`,
      this.SERVICE
    );
    if (!product || product === null) {
      this.logger.warn('Product not found')
      throw new NotFoundException(`Product ${id} not found`);
    }
    return await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    }).exec();
  }
// }

// we will more than likely change this delete function to an update sort of like a soft-delete. ex. isDeleted = true

  async delete(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndUpdate(id, { isHidden: true });
    if (!deletedProduct || deletedProduct === null) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return deletedProduct;
  }
}

