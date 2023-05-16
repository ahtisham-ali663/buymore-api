import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order';
import { Product } from './product';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Product;
}
