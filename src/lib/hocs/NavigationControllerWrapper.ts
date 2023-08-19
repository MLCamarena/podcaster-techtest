import { setIsLoading } from '@store/slices/loading.slice';
import { useEffect, useState, PropsWithChildren, FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const NavigationControllerWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [previousLocation, setPreviousLocation] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setPreviousLocation(location.pathname);
    dispatch(setIsLoading(true));
    if (location.pathname === previousLocation) {
      setPreviousLocation('');
    }
  }, [location]);

  useEffect(() => {
    dispatch(setIsLoading(false));
  }, [previousLocation]);

  return children;
};

export default NavigationControllerWrapper;
