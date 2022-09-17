import { Artists } from './artists.model';

export interface Album {
  name: string;
  total_tracks: number;
  album_type: string;
  release_date: string;
  artists: Artists[];
  uri: string;
  images: {
    url: string;
  };
}
