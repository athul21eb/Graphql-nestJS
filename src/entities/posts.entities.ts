import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Tags } from 'src/entities/tags.entities';
import { Users } from 'src/entities/users.entities';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Posts {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  content: string;

  @Field(() => [Tags])
  @ManyToMany(() => Tags, (tag) => tag.posts, { cascade: true })
  @JoinTable()
  tags: Promise<Tags[]>;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.posts,{onDelete:"CASCADE"})
  user: Promise<Users>;
}
