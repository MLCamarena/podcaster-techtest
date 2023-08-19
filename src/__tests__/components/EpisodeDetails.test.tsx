import EpisodeDetails from '@components/EpisodeDetails/EpisodeDetails';
import { store } from '@store/index';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useParams } from 'react-router';
import { vi, describe, test, Mock } from 'vitest';
import * as actionsExport from '@store/slices/podcast.slice';
import * as selectorExport from '@store/selectors/podcastList.selector';

describe('EpisodeDetails', () => {
  vi.mock('react-router', () => ({
    ...vi.importActual('react-router'),
    useParams: vi.fn(),
  }));

  test('EpisodeDetails render properly', () => {
    (useParams as Mock).mockReturnValue({ episodeId: '1' });
    const { baseElement } = render(
      <Provider store={store}>
        <EpisodeDetails />
      </Provider>,
    );
    expect(baseElement).toBeTruthy();
  });

  test('useParams hook has been called', () => {
    (useParams as Mock).mockReturnValue({ episodeId: '1' });

    render(
      <Provider store={store}>
        <EpisodeDetails />
      </Provider>,
    );
    expect(useParams).toHaveBeenCalled();
  });

  test('setSelectedAction has been dispatched', () => {
    (useParams as Mock).mockReturnValue({ episodeId: '1' });
    const spy = vi.spyOn(actionsExport, 'setSelectedEpisode');

    render(
      <Provider store={store}>
        <EpisodeDetails />
      </Provider>,
    );
    expect(spy).toHaveBeenCalled();
  });

  test('setSelectedAction has NOT been dispatched', () => {
    (useParams as Mock).mockReturnValue({});
    const spy = vi.spyOn(actionsExport, 'setSelectedEpisode');

    render(
      <Provider store={store}>
        <EpisodeDetails />
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  test('selectSelectedEpisode has been called', () => {
    (useParams as Mock).mockReturnValue({ episodeId: '1' });
    const spy = vi.spyOn(selectorExport, 'selectSelectedEpisode');

    render(
      <Provider store={store}>
        <EpisodeDetails />
      </Provider>,
    );
    expect(spy).toHaveBeenCalled();
  });
});
