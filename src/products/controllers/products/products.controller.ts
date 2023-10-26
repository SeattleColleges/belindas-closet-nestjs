import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Logger,
    Param,
    Post,
    Res,
    Put,
  } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products/products.service';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';

@Controller('products')
export class ProductsController {

  private readonly logger = new Logger;
  CONTROLLER: string = ProductsController.name;

  constructor(private readonly productService: ProductsService) {}
  
  @Post('new')
  async createProduct(@Body() productDto: CreateProductDto, @Res() response) {
    this.logger.log(`Creating Product ${JSON.stringify(productDto, null, '\t')}`, this.CONTROLLER)
    try {
      const newProduct = await this.productService.createProduct(productDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Product successfully created',
        product: newProduct,
      });
    } catch (error) {
      this.logger.error(`Product not created, error message: ${error.message}`, this.CONTROLLER);
      return {
        message: "Failed to create product, please try again",
        error: error.message,
      };
    }
  }
  
  @Get('')
  async getProducts(@Res() response) {
    this.logger.log('Finding all Products', this.CONTROLLER);
    try {
      const products = await this.productService.findAll();
      return response.status(HttpStatus.OK).json({
          message: 'Products successfully found',
          products: products,
      });
    } catch (error) {
      this.logger.error(`Products not found, error message: ${error.message}`, this.CONTROLLER);
      return response.status(HttpStatus.NOT_FOUND).json({
        message: "Products not found, please try again",
        error: error.message,
      });
    }
  }

  @Get('find/:id')
  async findByID(@Res() response, @Param('id') id: string) {
    this.logger.log(`Finding Product with id: ${id}`, this.CONTROLLER);
    try {
      const product = await this.productService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Product successfully found',
        product: product,
      });
    } catch (error) {
      this.logger.error(`Product not found, error message: ${error.message}`, this.CONTROLLER);
      return response.status(HttpStatus.NOT_FOUND).json({
        message: "Product not found, please try again",
        error: error.message,
      });
    }
  }

  @Put('update/:id')
  async updateProductById(
    @Res() response,
    @Param('id') id: string,
    @Body() productDto: UpdateProductDto,
  ) {
    this.logger.log(
      `Updating Product with id: ${id} with: ${JSON.stringify(productDto, null, '\t')}`, 
      this.CONTROLLER
    );
    try {
      const updatedProduct = await this.productService.updateProduct(id, productDto);
      return response.status(HttpStatus.OK).json({
        message: 'Product successfully updated',
        product: updatedProduct,
      });
    } catch (error) {
      this.logger.error(`Product not updated, error message: ${error.message}`, this.CONTROLLER);
      return response.status(HttpStatus.NOT_FOUND).json({
        message: "Failed to update product, please try again",
        error: error.message,
      });
    }
  }
}
  
  // we will more than likely change this delete function to an update sort of like a soft-delete. ex. isDeleted = true

  //   @Delete('remove/:id')
  //   async deleteProduct(@Res() response, @Param('id') id: string) {
  //     try {
  //       const deletedProduct = await this.productService.delete(id);
  //       return response.status(HttpStatus.OK).json({
  //         message: 'Product successfully deleted',
  //         product: deletedProduct,
  //       });
  //     } catch (error) {
  //       return response.status(HttpStatus.NOT_FOUND).json({
  //         message: "Failed to delete product, please try again",
  //         error: error.message,
  //       });
  //     }
  //   }
  // }
