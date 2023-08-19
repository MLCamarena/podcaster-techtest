import { store } from '@store/index';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useParams } from 'react-router';
import { vi, describe, test, Mock } from 'vitest';
import * as actionsExport from '@store/slices/podcast.slice';
import * as selectorExport from '@store/selectors/podcastList.selector';
import DetailsWrapper from '@components/PodcastDetails/DetailsWrapper';

describe('DetailsWrapper', () => {
  vi.mock('react-router', () => ({
    ...vi.importActual('react-router'),
    useParams: vi.fn(),
  }));

  test('DetailsWrapper render properly', () => {
    (useParams as Mock).mockReturnValue({ podcastId: '1' });
    const { baseElement } = render(
      <Provider store={store}>
        <DetailsWrapper />
      </Provider>,
    );
    expect(baseElement).toBeTruthy();
  });

  test('useParams hook has been called', () => {
    (useParams as Mock).mockReturnValue({ podcastId: '1' });

    render(
      <Provider store={store}>
        <DetailsWrapper />
      </Provider>,
    );
    expect(useParams).toHaveBeenCalled();
  });

  test('getPodcastDetailedRequest has been dispatched', () => {
    (useParams as Mock).mockReturnValue({ podcastId: '1' });
    const spy = vi.spyOn(actionsExport, 'getPodcastDetailedRequest');

    render(
      <Provider store={store}>
        <DetailsWrapper />
      </Provider>,
    );
    expect(spy).toHaveBeenCalled();
  });

  test('getPodcastDetailedRequest has NOT been dispatched', () => {
    (useParams as Mock).mockReturnValue({});
    const spy = vi.spyOn(actionsExport, 'getPodcastDetailedRequest');

    render(
      <Provider store={store}>
        <DetailsWrapper />
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  test('Selectors have been called', () => {
    (useParams as Mock).mockReturnValue({ podcastId: '1' });
    const spySelector1 = vi.spyOn(selectorExport, 'selectSelectedPodcast');
    const spySelector2 = vi.spyOn(selectorExport, 'selectLastListFetch');
    render(
      <Provider store={store}>
        <DetailsWrapper />
      </Provider>,
    );
    expect(spySelector1).toHaveBeenCalled();
    expect(spySelector2).toHaveBeenCalled();
  });
});
