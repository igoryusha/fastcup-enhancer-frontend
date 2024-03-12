import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

export interface PlayerProfileFromBackend {
  nickname: string;
  elo: { current: number };
  profileUrl: string;
}

export interface PlayerProfile {
  nickname: string;
  elo: number;
  url: string;
}

export interface PlayerProfile404 {}

const TAG_TYPE = 'Player';

const baseQuery = fetchBaseQuery({ baseUrl: process.env.API_BASE_URL });

export const api = createApi({
  baseQuery,
  tagTypes: [TAG_TYPE],
  endpoints: (build) => ({
    getPlayerProfile: build.query<PlayerProfile | PlayerProfile404, number>({
      // query: (steamId) => `/api/v1/profile/${steamId}`,
      async queryFn(steamId, queryApi, _extraOptions, fetchWithBQ) {
        try {
          const result = await fetchWithBQ(`/api/v1/profile/${steamId}`);

          const response = result.data;

          if (!response) {
            return { error: result.error as FetchBaseQueryError };
          }

          if (!Object.keys(response).length) {
            return { data: {} };
          }

          const {
            nickname,
            elo: { current: currentElo },
            profileUrl,
          } = response as PlayerProfileFromBackend;

          const playerProfile: PlayerProfile = {
            nickname,
            elo: currentElo,
            url: profileUrl,
          };

          return {
            data: playerProfile,
          };
        } catch (error) {
          if (
            error &&
            'status' in (error as FetchBaseQueryError) &&
            (error as FetchBaseQueryError).status === 404
          ) {
            return { data: {} as PlayerProfile404 };
          }

          return { error: error as FetchBaseQueryError };
        }
      },
      // providesTags: (result, error, id) => [{ type: TAG_TYPE, id }],
    }),
  }),
});

export const { useGetPlayerProfileQuery } = api;
