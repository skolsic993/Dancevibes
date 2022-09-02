import { Owner } from './owner.model';

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: { url: string };
  name: string;
  owner: Owner;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: { href: string; total: 0 };
  type: string;
  uri: string;
}
