import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Product, Review, Order, OrderItem } from './typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root123.',
      database: 'buymore_api',
      entities: [User, Product, Review, Order, OrderItem],
      synchronize: true,
    }),
    ProductModule,
    UserModule,
  ],
})
export class AppModule {}
