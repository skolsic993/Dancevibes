import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private clientId: string = 'd1bd990a7f9e4b419953ec73f6709e2b';

  constructor() {}
}
