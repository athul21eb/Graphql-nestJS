import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Posts } from 'src/entities/posts.entities';
import { Profiles } from 'src/entities/profiles.entities';
import { Role } from 'src/enum/role.enum';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Users {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({ nullable: true })
  password: string;

  @Field(() => Role, { nullable: true })
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // 1️⃣ One-to-one with Profile
  @Field(() => Profiles, { nullable: true })
  @OneToOne(() => Profiles, (profile) => profile.user, { cascade: true })
  profile: Promise<Profiles>;

  // 2️⃣ One-to-many with Posts
  @Field(() => [Posts])
  @OneToMany(() => Posts, (post) => post.user, { cascade: true })
  posts: Promise<Posts[]>;
}
