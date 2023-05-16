import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './dto';

@Injectable()
export class ProductService {
  obj = [];
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addProduct(product: any) {
    try {
      const createProduct = this.productRepository.create(product);
      const res = await this.productRepository.save(createProduct);
      return res;
    } catch (error) {
      throw new BadRequestException('Failed to add product.');
    }
  }

  async getAllProducts(): Promise<ProductDto[]> {
    try {
      const products = await this.productRepository.find();
      this.obj = products;
      return products;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch products');
    }
  }

  async deleteProduct(id: string) {
    try {
      const result = await this.productRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Product not found');
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete product');
    }
  }

  async updateProduct(id: any, payload: any) {
    try {
      const { ...updatedFields } = payload;
      const updatedProduct = await this.productRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!updatedProduct) {
        throw new NotFoundException('Product not found');
      }
      const updatedData = await this.productRepository.update(
        id,
        updatedFields,
      );
      return updatedData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update product');
    }
  }

  async getAllProductByCategory(category: string) {
    try {
      const allProducts = await this.productRepository.find({
        where: {
          category: category,
        },
      });
      if (!allProducts) {
        throw new NotFoundException('Product not found');
      }
      this.obj = allProducts;
      return allProducts;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update product');
    }
  }
}
