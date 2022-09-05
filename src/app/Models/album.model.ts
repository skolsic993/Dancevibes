import { Artists } from './artists.model';

export interface Album {
  album: {
    name: string;
    total_tracks: number;
    album_type: string;
    artists: Artists;
    images: {
      url: string;
    };
  };
}
