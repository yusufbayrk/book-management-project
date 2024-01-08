import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.schema';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const bcryptedPassword = await bcrypt.hash(password, saltOrRounds);
    const user = new this.userModel({
      username,
      email,
      password: bcryptedPassword,
    });
    return await user.save();
  }
  async signIn(username: string, password: string): Promise<{ token: string }> {
    const user = await this.findUserByUsername(username);

    if (!user) {
      throw new Error('User not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Uncorrect Password');
    }

    const payload = { sub: user.id };
    return {
      token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_SECRET || 'secret',
      }),
    };
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateUser(
    id: string,
    updatedData: Partial<User>,
  ): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, updatedData, { new: true })
      .exec();
  }
}
