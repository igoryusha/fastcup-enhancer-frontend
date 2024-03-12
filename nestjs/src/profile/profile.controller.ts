import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ImATeapotException,
  NotFoundException,
} from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

import { AxiosError, HttpStatusCode } from 'axios';

import { ProfileService } from './profile.service';

@Controller('api/v1/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':steamId')
  async getProfile(@Param('steamId') steamId: string) {
    if (!steamId || !parseInt(steamId)) {
      throw new BadRequestException('Something bad happened', {
        description: 'Invalid steamId',
      });
    }

    const { data } = await firstValueFrom(
      this.profileService.getProfile(steamId).pipe(
        catchError((error: AxiosError) => {
          const { status } = error.toJSON() as { status: HttpStatusCode };

          switch (status) {
            case HttpStatusCode.BadRequest:
              throw new BadRequestException();

            case HttpStatusCode.NotFound:
              throw new NotFoundException(
                'Player does not have a faceit account',
              );

            default:
          }

          throw new ImATeapotException();
        }),
      ),
    );

    const {
      nickname,
      avatar,
      country,
      games: {
        cs2: { faceit_elo },
      },
      faceit_url,
    } = data;

    return {
      nickname,
      avatar,
      country,
      elo: {
        current: faceit_elo,
      },
      profileUrl: faceit_url.replace('{lang}', 'en'),
    };
  }
}
