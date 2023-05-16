import { ProductDto } from './dto';
import { ProductService } from './product.service';
import { AuthGuard } from './../auth/guard';
import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';
import { Roles } from 'src/auth/guard/roles.decorator';
import { RoleEnum } from './../auth/dto/auth.dto';
import { RolesGuard } from 'src/auth/guard/roles.guard';
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Post('add-product')
  addProduct(@Body() payload: ProductDto) {
    return this.productService.addProduct(payload);
  }

  // @Roles(RoleEnum.USER, RoleEnum.MODERATOR)
  // @UseGuards(AuthGuard)
  @Get('all-product')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @UseGuards(AuthGuard)
  @Delete('remove-product/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  @UseGuards(AuthGuard)
  @Patch('update/:id')
  updateProduct(@Param('id') id: string, @Body() updateProduct: any) {
    return this.productService.updateProduct(id, updateProduct);
  }

  // @UseGuards(AuthGuard)
  @Get('category-product/:category')
  getAllProductByCategory(@Param('category') category: string) {
    return this.productService.getAllProductByCategory(category);
  }
}
