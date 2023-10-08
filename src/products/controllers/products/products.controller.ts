import {
    Body,
    Controller,
    Get,
    HttpStatus,
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
    constructor(private readonly productService: ProductsService) {}
  
    @Post('add')
    async createProduct(@Body() productDto: CreateProductDto) {
      try {
        const product = await this.productService.createProduct(productDto);
        return {
          message: 'Product successfully created',
          product: product,
        };
      } catch (error) {
        return {
          message: "Failed to create product, please try again",
          error: error.message,
        };
      }
    }
  
    @Get('')
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
  
    @Get(':id')
    async findByID( 
    @Res() response, 
    @Param('id') id: string) {
      console.log(id);
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
  
    @Put('update/:id')
    async updateProductById(
      @Res() response,
      @Param('id') id: string,
      @Body() productDto: UpdateProductDto,
    ) {
      try {
        const updatedProduct = await this.productService.updateProduct(id, productDto);
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
  }
  
  // we will more than likely change this delete function to an update sort of like a soft-delete. ex. isDeleted = true

  //   @Delete('/:id')
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
