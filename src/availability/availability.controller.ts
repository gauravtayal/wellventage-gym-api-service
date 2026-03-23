import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { Availability } from './availability.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post('createNewAvailability')
  async createAvailbility(
    @Req() req,
    @Body() availability: Partial<Availability>,
  ) {
    const userId = req.user.sub;
    const { name, sessionType, sessionData } = availability;

    const availabilityData = await this.availabilityService.createAvailability({
      name,
      sessionData,
      sessionType,
      userId,
    });

    return {
      message: 'Availability created successfully',
      availabilityData,
    };
  }

  @Get('getAvailability')
  async findAll(@Req() req) {
    const userId = req.user.sub;
    const availabilityData = await this.availabilityService.getAvailability(
      userId,
    );
    return {
      message: 'Availability fetched successfully',
      availabilityData,
    };
  }

  @Delete('deleteAvailability/:id')
  async deleteAvailability(
    @Req() req,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    const userId = req.user.sub;
    const { date, time } = body;
    const availabilityData = await this.availabilityService.getAvailabilityById(
      id,
      userId,
    );
    if (!availabilityData) {
      return {
        message: 'No Schedule found!',
      };
    }
    const dateData = availabilityData.sessionData[date];
    if (!dateData) {
      return {
        message: 'No availability found! on ' + date,
      };
    }
    if (time) {
      const dataIndex = dateData.findIndex(
        (item) =>
          item.startTime === time.startTime && item.endTime === time.endTime,
      );
      if (dataIndex === -1) {
        return {
          message: 'Time Slot not found!',
        };
      }
      dateData.splice(dataIndex, 1);
    }
    const updatedData = await this.availabilityService.updateAvailability(id, {
      sessionData: availabilityData.sessionData,
    });
    return {
      message: 'Availabile Slot deleted successfully!',
      updatedData,
    };
  }
}
