import { RootState } from '@store/index';
import { createSelector } from '@reduxjs/toolkit';

const getLoadingContext = (state: RootState) => state.loading;

const selectedNavigationLoading = createSelector(getLoadingContext, (loadingContext) => loadingContext.isLoading);

export { selectedNavigationLoading };
