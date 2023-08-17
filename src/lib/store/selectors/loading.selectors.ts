import { RootState } from '@store/index';
import { createSelector } from '@reduxjs/toolkit';

const getLoadingContext = (state: RootState) => state.loading;

const selectIsLoading = createSelector(getLoadingContext, (loadingContext) => loadingContext.isLoading);

export { selectIsLoading };
