import { ImATeapotException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';

import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProfileService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getProfile(steamId: string): Observable<AxiosResponse<any>> {
    const faceitApiToken = this.configService.get<string>('FACEIT_API_TOKEN');
    const faceitBaseUrl = this.configService.get<string>('FACEIT_BASE_URL');

    if (!faceitBaseUrl || !faceitApiToken) {
      throw new ImATeapotException();
    }

    return this.httpService.get(`/data/v4/players`, {
      baseURL: faceitBaseUrl,
      params: {
        game: 'csgo',
        game_player_id: steamId,
      },

      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${faceitApiToken}`,
      },
    });
  }
}
