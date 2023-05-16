import { ProductService } from './../product/product.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @Inject(ProductService)
    private productService: ProductService,
  ) {}

  getProductFromUser() {
    return this.productService.obj;
  }
}
