import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutPlan } from './workout-plan.entity';
import { Session } from './session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(WorkoutPlan)
    private workoutPlanRepository: Repository<WorkoutPlan>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  async createWorkoutPlan(
    workoutPlan: Partial<WorkoutPlan>,
  ): Promise<WorkoutPlan> {
    const workoutPlanData = this.workoutPlanRepository.create(workoutPlan);
    return this.workoutPlanRepository.save(workoutPlanData);
  }

  async getWorkoutPlan(userId: string): Promise<WorkoutPlan[]> {
    return this.workoutPlanRepository.find({ where: { userId } });
  }

  async deleteWorkoutPlan(id: string): Promise<void> {
    await this.workoutPlanRepository.delete(id);
  }
}
