import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from '../../schemas/product.schema';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger();
  SERVICE: string = ProductsService.name;

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createProduct(product: Product): Promise<Product> {
    this.logger.log(
      `Creating Product: ${JSON.stringify(product, null, '\t')}`,
      this.SERVICE,
    );
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
      this.logger.warn('Product not found');
      throw new NotFoundException(`Product ${id} not found`, this.SERVICE);
    }
    this.logger.log(
      `Product found: ${JSON.stringify(product, null, '\t')}`,
      this.SERVICE,
    );
    return product;
  }

  async updateProduct(id: string, product: Product): Promise<Product> {
    this.logger.log(
      `Updating Product with id: ${id} with: ${JSON.stringify(
        product,
        null,
        '\t',
      )}`,
      this.SERVICE,
    );
    if (!product || product === null) {
      // what is logged and the exception thrown is not correct
      // this is checking if a product with updated properities is sent from the controller
      // no new product was supplied, this is a Bad Request
      this.logger.warn('Product not found');
      throw new NotFoundException(`Product ${id} not found`);
    }
    return await this.productModel
      .findByIdAndUpdate(id, product, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async delete(id: string): Promise<Product> {
    this.logger.log(`Soft deleting Product with id: ${id}`, this.SERVICE);
    if (!Types.ObjectId.isValid(id)) {
      this.logger.warn('Invalid Id format');
      throw new BadRequestException('Invalid Id format');
    }
    const deletedProduct = await this.productModel
      .findByIdAndUpdate(id, { isHidden: true })
      .exec();
    if (!deletedProduct || deletedProduct === null) {
      this.logger.warn('Product not found');
      throw new NotFoundException(`Product ${id} not found`);
    }
    return deletedProduct;
  }

  async archive(id: string): Promise<Product> {
    this.logger.log(`Archiving Product with id: ${id}`, this.SERVICE);
    if (!Types.ObjectId.isValid(id)) {
      this.logger.warn('Invalid Id format');
      throw new BadRequestException('Invalid Id format');
    }
    const archivedProduct = await this.productModel
      .findByIdAndUpdate(id, { isSold: true })
      .exec();
    if (!archivedProduct || archivedProduct === null) {
      this.logger.warn('Product not found');
      throw new NotFoundException(`Product ${id} not found`);
    }
    return archivedProduct;
  }
}
