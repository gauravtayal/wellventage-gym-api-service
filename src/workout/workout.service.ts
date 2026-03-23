import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutPlan } from './workout-plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(WorkoutPlan)
    private workoutPlanRepository: Repository<WorkoutPlan>,
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

  async getWorkoutPlanById(id: string, userId: string): Promise<WorkoutPlan> {
    return this.workoutPlanRepository.findOne({ where: { id, userId } });
  }

  async updateWorkoutPlan(
    id: string,
    workoutPlan: Partial<WorkoutPlan>,
  ): Promise<WorkoutPlan> {
    await this.workoutPlanRepository.update(id, workoutPlan);
    return this.workoutPlanRepository.findOne({ where: { id } });
  }

  async deleteWorkoutPlan(id: string): Promise<void> {
    await this.workoutPlanRepository.delete(id);
  }
}
