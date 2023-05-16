import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from './review';
import { OrderItem } from './orderItem';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'double' })
  price: number;

  @Column({ nullable: false })
  imageUrl: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  category: string;

  @Column({ type: 'decimal', nullable: true })
  rating: number;

  @OneToMany(() => Review, (review) => review.product, { cascade: true })
  reviews: Review[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}
