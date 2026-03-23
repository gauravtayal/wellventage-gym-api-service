import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Availability } from './availability.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
  ) {}

  async createAvailability(
    availability: Partial<Availability>,
  ): Promise<Availability> {
    const availabilityData = this.availabilityRepository.create(availability);
    return this.availabilityRepository.save(availabilityData);
  }

  async getAvailability(userId: string): Promise<Availability[]> {
    return this.availabilityRepository.find({ where: { userId } });
  }

  async getAvailabilityById(id: string, userId: string): Promise<Availability> {
    return this.availabilityRepository.findOne({ where: { id, userId } });
  }

  async deleteAvailability(id: string): Promise<void> {
    await this.availabilityRepository.delete(id);
  }

  async updateAvailability(
    id: string,
    availability: Partial<Availability>,
  ): Promise<Availability> {
    await this.availabilityRepository.update(id, availability);
    return this.availabilityRepository.findOne({ where: { id } });
  }
}
