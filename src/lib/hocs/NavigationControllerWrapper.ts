import { setNavigationLoading } from '@store/slices/loading.slice';
import { useEffect, useState, PropsWithChildren, FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const NavigationControllerWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [previousLocation, setPreviousLocation] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setPreviousLocation(location.pathname);
    dispatch(setNavigationLoading(true));
    if (location.pathname === previousLocation) {
      setPreviousLocation('');
    }
  }, [location]);

  useEffect(() => {
    dispatch(setNavigationLoading(false));
  }, [previousLocation]);

  return children;
};

export default NavigationControllerWrapper;
