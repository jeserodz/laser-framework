import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  uuid: string;

  @Column()
  issuedDate: Date;

  @Column()
  expirationDate: Date;

  @ManyToOne(type => User, user => user.tokens)
  user: User;
}
