import { FC, PropsWithChildren } from 'react';
import { Stack, StackProps } from '@mui/material';
import Navbar from '@components/Navbar/Navbar';
import EnvBanner from '@components-ui/EnvBanner/EnvBanner';

const Container = ({ children }: StackProps) => {
  return (
    <Stack width='100%' maxWidth='960px' position='relative' pt='30px'>
      {children}
    </Stack>
  );
};

const LayoutWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack direction='column' minHeight='100vh'>
      {import.meta.env.DEV && <EnvBanner />}
      <Navbar />
      <Container>{children}</Container>
    </Stack>
  );
};

export default LayoutWrapper;
