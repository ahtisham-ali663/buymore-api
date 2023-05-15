import { User } from './../typeorm/user';
import { AuthSignUpDto, AuthSignInDto } from './dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';

@Injectable({})
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signIn(signInDto: AuthSignInDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: signInDto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    const pwdMatches = await argon.verify(user.password, signInDto.password);
    if (!pwdMatches) {
      throw new ForbiddenException('Credenials Incorrect');
    }
    delete user.password;
    return this.signToken(user.id, user.email);
  }
  async signUp(signUpDto: AuthSignUpDto) {
    const hashedPassword = await argon.hash(signUpDto.password);
    try {
      const userEntity = this.userRepository.create({
        ...signUpDto,
        password: hashedPassword,
      });
      const user = await this.userRepository.save(userEntity);
      delete user.password;
      return user;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // Unique constraint violation
        throw new ForbiddenException('Email address is already in use.');
      }
      throw error;
    }
  }
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_tokken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: secret,
    });
    return {
      access_tokken: token,
    };
  }
}
