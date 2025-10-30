import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Users } from 'src/entities/users.entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Profiles {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  bio: string;

  @Field()
  @Column()
  avatar: string;

  @Field(() => Users)
  @OneToOne(() => Users, (user) => user.profile)
  @JoinColumn()
  user: Promise<Users>;
}
