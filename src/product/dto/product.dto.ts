import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  imageUrl: string;

  @IsNotEmpty()
  category: string;

  description?: string;

  rating?: number;
}
