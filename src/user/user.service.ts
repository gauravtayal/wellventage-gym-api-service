import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { use } from 'passport';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const UserData = this.userRepository.create({
      email: user.email,
      name: user.name,
      photo: user.photo,
      googleId: user.id,
      googleToken: user.accessToken,
      isActive: true,
    });
    return this.userRepository.save(UserData);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
