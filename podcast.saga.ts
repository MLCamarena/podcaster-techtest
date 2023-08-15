import { getPodcastListRequest } from '@store/slices/podcast.slice';
import { spawn, takeLatest } from 'redux-saga/effects';

export default function* podcastSaga() {
  yield spawn(watchKillersAsync);
}

function* watchKillersAsync() {
  yield takeLatest(getPodcastListRequest.type, getPodcastList);
}

function* getPodcastList(): any {
  try {
    console.log(import.meta.env.VITE_API_URL);
  } catch (error) {
    console.log(error);
  }
}
