import { IsEmpty, IsOptional, IsString, IsBoolean, IsEnum } from "class-validator";
import { User } from "../../user/schemas/user.schema";
import {ProductType, ProductGender, ProductSizes, ShoeSize, PantsSize} from "../enums"

export class CreateProductDto {
    @IsEmpty({message: 'ID field is not required'})
    createdByUser: User;
    
    @IsEnum(ProductType)
    productType: ProductType;
  
    @IsEnum(ProductGender)
    productGender: ProductGender;
  
    // @IsEnum(ShoeSize)
    @IsOptional()
    productSizeShoe?: ShoeSize | null;
  
    @IsOptional()
    // @IsEnum(ProductSizes, { message: "Invalid size. Allowed values are XS, S, M, L, XL, XXL, or null." })
    productSizes?: ProductSizes | null;
  
    // @IsEnum(PantsSize)
    @IsOptional()
    productSizePantsWaist?: PantsSize | null;
  
    // @IsEnum(PantsSize)
    @IsOptional()
    productSizePantsInseam?: PantsSize | null;
  
    @IsOptional()
    @IsString()
    productDescription?: string;
  
    @IsString()
    @IsOptional()
    productImage?: string;
  
    @IsBoolean()
    isHidden: boolean;
  
    @IsBoolean()
    isSold: boolean;
}