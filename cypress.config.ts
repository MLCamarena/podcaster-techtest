import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'podcaster-techtest',
  env: {
    BASE_URL: 'http://localhost:5173/',
    PODCAST_LIST_URL:
      'https://api.allorigins.win/get?url=https%3A%2F%2Fitunes.apple.com%2Fus%2Frss%2Ftoppodcasts%2Flimit%3D100%2Fgenre%3D1310%2Fjson',
    PODCAST_DETAILS_URL: 'https://api.allorigins.win/get?url=https%3A%2F%2Fitunes.apple.com%2Flookup%3Fid%3D',
    PODCAST_DETAILS_URL_SUFFIXES: '%26media%3Dpodcast%26entity%3DpodcastEpisode%26limit%3D20',
    PODCAST_ID: '1535809341',
    EPISODE_ID: '1000623144523',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
