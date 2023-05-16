import { Product } from './../typeorm/product';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Product]), JwtModule.register({})],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
