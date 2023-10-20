import { ArrayNotContains, ArrayNotEmpty, IsArray, IsEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsEmpty({message: 'ID field is not required'})
    readonly createByUserID: string;

    @ArrayNotEmpty({message: 'Product Type field is required'})
    @ArrayNotContains([''], {message: 'Product Type field is required'})
    @IsArray()
    readonly productType: [];

    @IsOptional()
    @IsArray()
    readonly gender: [];

    @IsOptional()
    @IsArray()
    readonly productShoeSize: [];

    @IsOptional()
    @IsArray()
    readonly productSize: [];

    @IsOptional()
    @IsArray()
    readonly productSizePantsWaist: [];

    @IsOptional()
    @IsArray()
    readonly productSizePantsInseam: [];

    @IsOptional()
    @IsString()
    readonly productDescriptionOptional: string;

    @IsOptional()
    @IsString()
    readonly productImage: string;
}