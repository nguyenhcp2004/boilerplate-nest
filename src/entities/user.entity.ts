import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  created_at: Date

  @Column()
  updated_at: Date
}
