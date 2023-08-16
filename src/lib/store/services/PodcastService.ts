const corsHelperUrl = import.meta.env.VITE_CORS_AVOID_URL;
const podcastListUrl = import.meta.env.VITE_PODCAST_LIST_URL;

const PodcastService = {
  getList: () =>
    fetch(`${corsHelperUrl}${encodeURIComponent(podcastListUrl)}`, {
      mode: 'cors',
    }),
};

export default PodcastService;
