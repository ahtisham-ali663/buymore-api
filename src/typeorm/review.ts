import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user';
import { Product } from './product';

@Entity()
export class Review {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  reviewId: string;

  @Column()
  userId: string;

  @Column()
  userName: string;

  @Column()
  comment: string;

  @Column()
  rating: number;

  @Column()
  date: string;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;
}
