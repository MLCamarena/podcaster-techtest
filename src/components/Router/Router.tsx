import { Outlet, createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import HomePage from '@pages/home';
import { ROUTE_EPISODE, ROUTE_HOME, ROUTE_PODCAST } from '@constants/routes';
import PodcastPage from '@pages/podcast';
import EpisodePage from '@pages/episode';
import LayoutWrapper from '@components/Layout/LayoutWrapper';
// import NavigationControllerWrapper from '@hocs/NavigationControllerWrapper';
import FallbackPage from '@pages/fallback';
import DetailsWrapper from '@components/PodcastDetails/DetailsWrapper';

export const routesDefinition: RouteObject[] = [
  {
    path: `${ROUTE_HOME}`,
    element: (
      <>
        <LayoutWrapper>
          <Outlet />
        </LayoutWrapper>
      </>
    ),
    errorElement: (
      <LayoutWrapper>
        <FallbackPage />
      </LayoutWrapper>
    ),
    children: [
      { path: `${ROUTE_HOME}`, element: <HomePage /> },
      {
        path: `/${ROUTE_PODCAST}/:podcastId`,
        element: (
          <DetailsWrapper>
            <Outlet />
          </DetailsWrapper>
        ),
        children: [
          { path: '', element: <PodcastPage /> },
          {
            path: `${ROUTE_EPISODE}/:episodeId`,
            element: <EpisodePage />,
          },
        ],
      },
    ],
  },
];
const router = createBrowserRouter(routesDefinition);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
