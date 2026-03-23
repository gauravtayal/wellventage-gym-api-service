import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { WorkoutPlan } from './workout-plan.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'json' }) // Array of dates/strings
  sessionDates: string[];

  @Column()
  sessionType: string;

  @Column({ default: 'active' })
  status: string;

  @ManyToOne(() => WorkoutPlan, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workoutId' })
  workoutPlan: WorkoutPlan;

  @Column()
  workoutId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
