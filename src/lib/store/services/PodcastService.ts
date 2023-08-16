const corsHelperUrl = import.meta.env.VITE_CORS_AVOID_URL;
const podcastListUrl = import.meta.env.VITE_PODCAST_LIST_URL;
const detailsListUrl = import.meta.env.VITE_PODCAST_DETAIL_URL;
const detailParams = '&media=podcast&entity=podcastEpisode&limit=20';

const PodcastService = {
  getList: () =>
    fetch(`${corsHelperUrl}${encodeURIComponent(podcastListUrl)}`, {
      mode: 'cors',
    }),
  getDetails: (id: string) =>
    fetch(`${corsHelperUrl}${encodeURIComponent(`${detailsListUrl}${id}${detailParams}`)}`, {
      mode: 'cors',
    }),
};

export default PodcastService;
