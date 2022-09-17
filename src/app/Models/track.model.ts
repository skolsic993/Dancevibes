import { Album } from './album.model';
import { Artists } from './artists.model';

export interface Track {
  uid: string;
  id: string;
  name: string;
  duration_ms: number;
  popularity: number;
  preview_url: string;
  album: Album;
  artists: Artists[];
  uri: string;
}
