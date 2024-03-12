import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { PingController } from './ping/ping.controller';

import { ProfileService } from './profile/profile.service';
import { ProfileController } from './profile/profile.controller';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [ProfileController, PingController],
  providers: [ProfileService],
})
export class AppModule {}
