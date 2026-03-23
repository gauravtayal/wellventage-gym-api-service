import {
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  Req,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WorkoutService } from './workout.service';

@UseGuards(AuthGuard('jwt'))
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}
  @Get('workoutPlan')
  async getWorkoutPlan(@Req() req) {
    const getWorkoutPlan = await this.workoutService.getWorkoutPlan(
      req.user.sub,
    );
    return {
      message: 'Workout plan fetched successfully!',
      getWorkoutPlan,
    };
  }

  @Post('workoutPlanCreate')
  async createWorkout(@Req() req, @Body() body: any) {
    const { name, workoutData, description } = body;
    const workoutRecord = await this.workoutService.createWorkoutPlan({
      name,
      workoutData,
      description,
      userId: req.user.sub,
    });
    return {
      message: 'Workout created successfully!',
      workoutRecord,
    };
  }

  @Delete('workoutPlanDelete')
  deleteWorkout() {
    return 'Workout';
  }
}
