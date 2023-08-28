import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Patch,
    Res,
  } from '@nestjs/common';
  import { ProductsService } from 'src/products/services/products/products.service';

  
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productService: ProductsService) {}
  
    @Post('add')
    async createProduct(
      @Res() response, 
      @Body('productId') productId: string,
      @Body('productType') productType: [],
      @Body('gender') gender: [],
      @Body('productShoeSize') productShoeSize: [],
      @Body('productSize') productSize: [],
      @Body('productSizePantsWaist') productSizePantsWaist: [],
      @Body('productSizePantsInseam') productSizePantsInseam: [],
      @Body('productDescriptionOptional') productDescriptionOptional: string,
      @Body('productImage') productImage: string,

      ) {
      try {
        const newProduct = await this.productService.create(
          productId,
          productType,
          gender,
          productShoeSize,
          productSize,
          productSizePantsWaist,
          productSizePantsInseam,
          productDescriptionOptional,
          productImage,

          );
        return response.status(HttpStatus.CREATED).json({
          message: 'Product successfully created',
          id: newProduct
        });
      } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: 'Failed to create product, please try again',
          error: error.message,
        });
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
  
    @Get('/:id')
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
  
    @Patch('update/:id')
    async updateProduct(
      @Res() response,
      @Param('id') id: string,
      @Body('productId') productId: string,
      @Body('productType') productType: [],
      @Body('gender') gender: [],
      @Body('productShoeSize') productShoeSize: [],
      @Body('productSize') productSize: [],
      @Body('productSizePantsWaist') productSizePantsWaist: [],
      @Body('productSizePantsInseam') productSizePantsInseam: [],
      @Body('productDescriptionOptional') productDescriptionOptional: string,
      @Body('productImage') productImage: string,
    ) {
      try {
        const updatedProduct = await this.productService.updateProduct(
          id, 
          productId,
          productType,
          gender,
          productShoeSize,
          productSize,
          productSizePantsWaist,
          productSizePantsInseam,
          productDescriptionOptional,
          productImage,
          );
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
