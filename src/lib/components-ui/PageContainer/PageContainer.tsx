import { FC, PropsWithChildren } from 'react';
import { Stack, StackProps } from '@mui/material';

const PageContainer: FC<PropsWithChildren> = ({ children }: StackProps) => {
  return (
    <Stack id='pageContainer1' width='100%' alignItems='center'>
      <Stack id='pageContainer2' width='100%' maxWidth='960px'>
        {children}
      </Stack>
    </Stack>
  );
};

export default PageContainer;
