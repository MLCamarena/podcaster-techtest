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

/**
 * Podcast saga root
 */
export default function* podcastSaga() {
  yield spawn(watchKillersAsync);
}

/**
 * Action listener function
 */
function* watchKillersAsync() {
  yield takeEvery(getPodcastListRequest.type, getPodcastList);
  yield takeEvery(getPodcastDetailedRequest.type, getPodcastDetails);
}

/**
 * Podcast details saga.
 * First, check if there is any selected podcast in current list, also used to check if there is any list.
 * If not, it will dispatch the action to get the list first (its used if a absolute navigation to this route is made directly in the browser url search)
 * If there is a podcast in the list and its already detailed and after check if 24h from last fetch, it returns the same element without new requests
 * if not, a request is made and then dispatched to reducer
 */
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

/**
 * Podcast list saga.
 * First, check if there is a list and if 24h from last fetch.
 * If there is list and persistence is valid, it returns the same list without new requests
 * if not, a request is made and then dispatched to reducer
 */
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
