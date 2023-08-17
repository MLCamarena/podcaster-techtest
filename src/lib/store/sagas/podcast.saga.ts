import { APIPodcastDetailResponse, APIPodcastListResponse } from '@models/api/podcasts';
import CustomError from '@models/networkError.model';
import { PodcastListItem, PodcastDetailed } from '@models/podcast.model';
import { selectLastListFetch, selectPodcastFromList, selectPodcastList } from '@store/selectors/podcastList.selector';
import PodcastService from '@store/services/PodcastService';
import { setIsLoading } from '@store/slices/loading.slice';
import {
  getPodcastDetailedRequest,
  getPodcastDetailedSuccess,
  getPodcastListError,
  getPodcastListRequest,
  getPodcastListSuccess,
} from '@store/slices/podcast.slice';
import { checkMaxAgePersistence } from '@utils/date';
import { mapApiPodcastDetail, mapApiPodcastList } from '@utils/podcast';
import { toast } from 'react-toastify';
import { call, put, select, spawn, takeEvery } from 'redux-saga/effects';

type PodcastDetailActionType = { type: string; payload: string };

export default function* podcastSaga() {
  yield spawn(watchKillersAsync);
}

function* watchKillersAsync() {
  yield takeEvery(getPodcastListRequest.type, getPodcastList);
  yield takeEvery(getPodcastDetailedRequest.type, getPodcastDetails);
}

function* getPodcastDetails({ payload }: PodcastDetailActionType): any {
  try {
    yield put(setIsLoading(true));
    const podcast: PodcastListItem = yield select(selectPodcastFromList(payload));
    if (podcast) {
      if (
        !('lastFetch' in podcast) ||
        ('lastFetch' in podcast && checkMaxAgePersistence((podcast as PodcastDetailed).lastFetch))
      ) {
        const res = yield call(PodcastService.getDetails, payload);
        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}`);
        }
        const data = yield res.json();
        const contents = yield data.contents;
        const mappedResult = mapApiPodcastDetail(JSON.parse(contents) as APIPodcastDetailResponse, podcast);
        yield put(getPodcastDetailedSuccess(mappedResult));
      }
      yield put(setIsLoading(false));
    } else {
      yield put(getPodcastListRequest());
    }
  } catch (error) {
    const errorMessage = error as CustomError;
    yield put(setIsLoading(false));
    yield put(getPodcastListError(errorMessage.message));
    console.log(error);
    toast.error(errorMessage.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  }
}

function* getPodcastList(): any {
  try {
    yield put(setIsLoading(true));
    const currentList: PodcastListItem[] = yield select(selectPodcastList);
    const lastUpdate: number = yield select(selectLastListFetch);
    if (!currentList.length || (lastUpdate && checkMaxAgePersistence(lastUpdate))) {
      const res = yield call(PodcastService.getList);
      const data = yield res.json();
      if (!res.ok) {
        throw new Error(`Error HTTP ${res.status} : ${data.error}`);
      }
      const contents = yield data.contents;
      const mappedResults = mapApiPodcastList(JSON.parse(contents) as APIPodcastListResponse);
      yield put(getPodcastListSuccess(mappedResults));
    }
    yield put(setIsLoading(false));
  } catch (error) {
    const errorMessage = error as CustomError;
    yield put(setIsLoading(false));
    yield put(getPodcastListError(errorMessage.message));
    console.log(error);
    toast.error(errorMessage.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  }
}
