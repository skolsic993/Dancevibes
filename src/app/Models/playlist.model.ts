import { Artists } from './artists.model';
import { Owner } from './owner.model';
import { Track } from './track.model';

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  artists: Artists;
  total_tracks: number;
  images: { url: string };
  icons: { url: string };
  name: string;
  owner: Owner;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: { href: string; total: 0; items: { track: Track } };
  type: string;
  uri: string;
}
