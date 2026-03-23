import {
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  Req,
  Body,
  Param,
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

  @Delete('workoutPlanDelete/:id')
  async deleteWorkout(@Req() req, @Param('id') id: string, @Body() body: any) {
    const userId = req.user.sub;
    const { day, data } = body;
    const workoutPlan = await this.workoutService.getWorkoutPlanById(
      id,
      userId,
    );
    if (!workoutPlan) {
      return {
        message: 'Workout plan not found!',
      };
    }
    const dayData = workoutPlan.workoutData[day];
    if (!dayData) {
      return {
        message: 'Day not found!',
      };
    }
    if (data) {
      const dataIndex = dayData.findIndex(
        (item) =>
          item.name === data.name &&
          item.sets === data.sets &&
          item.reps === data.reps,
      );
      if (dataIndex === -1) {
        return {
          message: 'Data not found!',
        };
      }
      dayData.splice(dataIndex, 1);
    } else {
      delete workoutPlan.workoutData[day];
    }
    const updatedData = await this.workoutService.updateWorkoutPlan(id, {
      workoutData: workoutPlan.workoutData,
    });
    return {
      message: 'Workout plan deleted successfully!',
      updatedData,
    };
  }
}
