import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutPlan } from './workout-plan.entity';
import { Session } from './session.entity';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutPlan, Session])],
  controllers: [WorkoutController],
  providers: [WorkoutService],
})
export class WorkoutModule {}
