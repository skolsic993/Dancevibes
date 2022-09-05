import { Album } from './album.model';

export interface Track {
  id: string;
  name: string;
  duration_ms: number;
  popularity: number;
  preview_url: string;
  album: Album;
}
