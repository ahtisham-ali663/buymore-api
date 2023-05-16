// import { ProductService } from './../product/product.service';
import { ProductModule } from './../product/product.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  // imports: [forwardRef(() => ProductModule)],
  imports: [ProductModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
