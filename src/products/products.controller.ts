import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async createProduct(@Res() response, @Body() product: Product) {
    try {
      const newProduct = await this.productService.create(product);
      return response.status(HttpStatus.CREATED).json({
        message: 'Product successfully created',
        product: newProduct,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to create product, please try again',
        error: error.message,
      });
    }
  }

  @Get()
  async getProducts(@Res() response) {
    try {
      const products = await this.productService.findAll();
      return response.status(HttpStatus.OK).json({
          message: 'Products successfully found',
          products: products,
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: "Products not found, please try again",
        error: error.message,
      });
    }
  }

  @Get('/:id')
  async findByID(@Res() response, @Param('id') id: string) {
    try {
      const product = await this.productService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Product successfully found',
        product: product,
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: "Product not found, please try again",
        error: error.message,
      });
    }
  }

  @Put('/:id')
  async updateProduct(
    @Res() response,
    @Param('id') id: string,
    @Body() product: Product,
  ) {
    try {
      const updatedProduct = await this.productService.updateProduct(id, product);
    return response.status(HttpStatus.OK).json({
      message: 'Product successfully updated',
      product: updatedProduct,
    });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: "Failed to update product, please try again",
        error: error.message,
      });
    }
  }

  @Delete('/:id')
  async deleteProduct(@Res() response, @Param('id') id: string) {
    try {
      const deletedProduct = await this.productService.delete(id);
      return response.status(HttpStatus.OK).json({
        message: 'Product successfully deleted',
        product: deletedProduct,
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: "Failed to delete product, please try again",
        error: error.message,
      });
    }
  }
}
