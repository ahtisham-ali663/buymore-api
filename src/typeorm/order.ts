import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { OrderItem } from './orderItem';
import { User } from './user';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column('decimal')
  total: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
