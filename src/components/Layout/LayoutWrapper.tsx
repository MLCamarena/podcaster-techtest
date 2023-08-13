import { FC, PropsWithChildren } from 'react';
import { Stack } from '@mui/material';
import Navbar from '@components/Navbar/Navbar';
import EnvBanner from '@components-ui/EnvBanner/EnvBanner';
import PageContainer from '@components-ui/PageContainer/PageContainer';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack id='container1' width='100%' position='relative' pt='30px'>
      {children}
    </Stack>
  );
};

const LayoutWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack direction='column' minHeight='100vh'>
      {import.meta.env.DEV && <EnvBanner />}
      <Navbar />
      <Container>
        <PageContainer>{children}</PageContainer>
      </Container>
    </Stack>
  );
};

export default LayoutWrapper;
