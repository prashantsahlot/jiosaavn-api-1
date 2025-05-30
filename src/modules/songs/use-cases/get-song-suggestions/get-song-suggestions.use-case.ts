import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { createSongPayload } from '#modules/songs/helpers'
import { CreateSongStationUseCase } from '#modules/songs/use-cases'
import { HTTPException } from 'hono/http-exception'
import type { IUseCase } from '#common/types'
import type { SongModel, SongSuggestionAPIResponseModel } from '#modules/songs/models'
import type { z } from 'zod'

export interface GetSongSuggestionsArgs {
  songId: string
  limit: number
}

export class GetSongSuggestionsUseCase implements IUseCase<GetSongSuggestionsArgs, z.infer<typeof SongModel>[]> {
  private readonly createSongStation: CreateSongStationUseCase

  constructor() {
    this.createSongStation = new CreateSongStationUseCase()
  }

  async execute({ songId, limit }: GetSongSuggestionsArgs) {
    // 1) get or create a station
    const stationId = await this.createSongStation.execute(songId)

    // 2) fetch suggestions from the API
    const { data, ok } = await useFetch<z.infer<typeof SongSuggestionAPIResponseModel>>({
      endpoint: Endpoints.songs.suggestions,
      params: {
        stationid: stationId,
        k: limit
      },
      context: 'android'
    })

    if (!data || !ok) {
      throw new HTTPException(404, { message: `no suggestions found for the given song` })
    }

    // 3) normalize response into an array of items
    const rawSuggestions: any[] = Array.isArray((data as any).suggestions)
      ? (data as any).suggestions
      : Object.entries(data)
          .filter(([key]) => key !== 'stationid')
          .map(([, val]) => val)

    // 4) extract the actual song object (some APIs wrap it under `.song`)
    const songs = rawSuggestions
      .map(item => ((item as any).song ?? item) as any)
      .filter(songObj => songObj && typeof songObj.id === 'string')
      .slice(0, limit)
      .map(songObj => createSongPayload(songObj))

    return songs
  }
}

