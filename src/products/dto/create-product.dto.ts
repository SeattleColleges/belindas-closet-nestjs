import { IsArray, IsEmpty, IsString } from "class-validator";

export class CreateProductDto {
    @IsEmpty({message: 'ID field is not required'})
    readonly createByUserID: string;

    @IsString()
    readonly productId: string;

    @IsArray()
    readonly productType: [];

    @IsArray()
    readonly gender: [];

    @IsArray()
    readonly productShoeSize: [];

    @IsArray()
    readonly productSize: [];

    @IsArray()
    readonly productSizePantsWaist: [];

    @IsArray()
    readonly productSizePantsInseam: [];

    @IsString()
    readonly productDescriptionOptional: string;

    @IsString()
    readonly productImage: string;
}