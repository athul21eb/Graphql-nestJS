import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Posts } from 'src/entities/posts.entities';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Tags {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Posts])
  @ManyToMany(() => Posts, (post) => post.tags)
  posts: Promise<Posts[]>;
}
