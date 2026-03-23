import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutPlan } from './workout-plan.entity';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutPlan])],
  controllers: [WorkoutController],
  providers: [WorkoutService],
})
export class WorkoutModule {}
