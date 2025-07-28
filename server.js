require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Spotify API Credentials
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
let spotifyAccessToken = '';

// Get Spotify Access Token
async function getSpotifyToken() {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
        }
      }
    );
    spotifyAccessToken = response.data.access_token;
    return spotifyAccessToken;
  } catch (error) {
    console.error('Error getting Spotify token:', error.message);
    throw error;
  }
}

// Get Song Details from Spotify
app.get('/api/song/:id', async (req, res) => {
  try {
    const token = spotifyAccessToken || await getSpotifyToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/tracks/${req.params.id}`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );
    
    res.json({
      id: response.data.id,
      title: response.data.name,
      artist: response.data.artists.map(a => a.name).join(', '),
      duration_ms: response.data.duration_ms,
      album: response.data.album.name,
      cover_url: response.data.album.images[0]?.url,
      preview_url: response.data.preview_url,
      spotify_url: response.data.external_urls.spotify
    });
  } catch (error) {
    console.error('Error fetching song:', error.message);
    res.status(500).json({ error: 'Failed to fetch song details' });
  }
});

// Add Song to Database
app.post('/api/songs', async (req, res) => {
  try {
    const { song_id, message, user_name } = req.body;
    
    // First get song details from Spotify
    const token = spotifyAccessToken || await getSpotifyToken();
    const spotifyResponse = await axios.get(
      `https://api.spotify.com/v1/tracks/${song_id}`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );

    const songData = spotifyResponse.data;

    // Insert into songs table
    const { data: song, error: songError } = await supabase
      .from('songs')
      .insert([{
        song_id: songData.id,
        title: songData.name,
        artist: songData.artists[0].name,
        album: songData.album.name,
        duration_ms: songData.duration_ms,
        cover_url: songData.album.images[0]?.url,
        spotify_url: songData.external_urls.spotify
      }])
      .select();

    if (songError) throw songError;

    // If message provided, add to messages table
    if (message) {
      const { error: msgError } = await supabase
        .from('messages')
        .insert([{
          song_id: songData.id,
          name: user_name,
          message: message,
          avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(user_name)}&background=ff6b8b&color=fff`
        }]);

      if (msgError) throw msgError;
    }

    res.json(song[0]);
  } catch (error) {
    console.error('Error adding song:', error.message);
    res.status(500).json({ error: 'Failed to add song' });
  }
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  await getSpotifyToken();
  console.log(`Server running on port ${PORT}`);
});