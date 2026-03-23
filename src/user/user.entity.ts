import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  googleId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  photo: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  googleToken: string;

  @Column({ default: null })
  accessToken: string;

  @Column({ default: null })
  refreshToken: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
