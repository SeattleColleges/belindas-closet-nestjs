import { IsString, IsEmpty, IsOptional, IsArray } from 'class-validator';

export class UpdateProductDto {
    @IsOptional()
    @IsEmpty({message: 'ID field is not required'})
    readonly createByUserID: string;
    isHidden: boolean;

    @IsOptional()
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