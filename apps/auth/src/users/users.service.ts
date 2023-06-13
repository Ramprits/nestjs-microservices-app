import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { Types } from 'mongoose';
import { UserDocument } from './models/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      return await this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async verifyUser(
    email: string,
    password: string,
  ): Promise<{ id: Types.ObjectId }> {
    const user = await this.userRepository.findOne({ email });
    if (!user && (await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('credentials are not valid');
    }
    return { id: user._id };
  }
}
