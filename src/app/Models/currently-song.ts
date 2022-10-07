import { Album } from './album.model';

export interface CurrentlySong {
  actions: {
    disallows: {
      pausing: boolean;
      skipping_prev: boolean;
    };
  };
  context: string | null;
  currently_playing_type: string;
  is_playing: boolean;
  item: Album;
  progress_ms: number;
  timestamp: number;
}
