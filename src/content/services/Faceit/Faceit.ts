import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { NetworkQueueGrouper } from '@shared/utils/NetworkQueueGrouper';
import { find } from 'lodash';

export interface PlayerProfileDTO {
  avatar: string;
  nickname: string;
  elo: { current: number; skillLevel: number };
  profileUrl: string;
}

export interface PlayerProfile {
  avatar: string;
  nickname: string;
  elo: number;
  skillLevel: number;
  url: string;
}

export interface PlayerProfile404 {}

const TAG_TYPE = 'Player';

const baseQuery = fetchBaseQuery({ baseUrl: process.env.API_BASE_URL });

const queue = [];

const networkQueueGrouper = new NetworkQueueGrouper({
  delay: 50,

  async request(fetcher, steamIds) {
    return fetcher(`/api/v2/profile?steamID64=${steamIds}`);
  },
});

export const api = createApi({
  baseQuery,
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    getPlayerProfile: build.query<PlayerProfile | PlayerProfile404, number>({
      async queryFn(steamId, queryApi, _extraOptions, fetchWithBQ) {
        const { data, error } = await networkQueueGrouper.request<
          typeof fetchWithBQ
        >(fetchWithBQ, steamId);

        if (error) {
          return { error };
        }

        const response = (data as any)?.[steamId];

        if (!response || response.statusCode > 200) {
          return { data: {} };
        }

        const {
          avatar,
          nickname,
          elo: { current: currentElo, skillLevel },
          profileUrl,
        } = response.data as PlayerProfileDTO;

        const playerProfile: PlayerProfile = {
          avatar,
          nickname,
          elo: currentElo,
          url: profileUrl,
          skillLevel,
        };
        return {
          data: playerProfile,
        };
      },
      // providesTags: (result, error, id) => [{ type: TAG_TYPE, id }],
    }),
  }),
});

export const { useGetPlayerProfileQuery } = api;
