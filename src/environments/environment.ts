export const environment = {
  production: false,
  supabaseUrl: 'https://nqucyojvcygfrpjhouwa.supabase.co',
  supabaseKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xdWN5b2p2Y3lnZnJwamhvdXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk3MjgzNzcsImV4cCI6MTk3NTMwNDM3N30.YLt7UT-C1UnwMle5QJWQxkAP9Whufkg1MESZcqWKuK8',
  redirectUrl: 'http://localhost:8100/',
  scopes: [
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'streaming',
    'user-read-private',
    'user-library-read',
    'user-top-read',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-follow-read',
    'playlist-modify-public',
    'playlist-modify-private',
  ].join(','),
};
