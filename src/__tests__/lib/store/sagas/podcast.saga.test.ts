import { runSaga } from 'redux-saga';
import { vi } from 'vitest';
import * as sagas from '@store/sagas/podcast.saga';
import * as actionsExport from '@store/slices/loading.slice';

describe('Podcast saga', () => {
  test('getPodcastDetails should be called', async () => {
    const dispatched: any = [];

    const mockGetState = () => ({});
    const mockDispatch = (action: any) => dispatched.push(action);
    const spy = vi.spyOn(sagas, 'getPodcastDetails');
    const spyAction = vi.spyOn(actionsExport, 'setIsLoading');

    await runSaga(
      {
        dispatch: mockDispatch,
        getState: mockGetState,
        context: {},
        sagaMonitor: undefined,
        effectMiddlewares: [],
      },
      sagas.getPodcastDetails,
      { payload: '1' } as any,
    ).toPromise();
    expect(spyAction).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });
});
