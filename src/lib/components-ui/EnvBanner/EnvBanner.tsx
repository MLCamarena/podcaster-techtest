import { VERSION } from '@config/version';
import { Box, styled, Alert, AlertProps } from '@mui/material';
import { FC, forwardRef } from 'react';

const BannerRoot = styled(Alert, {
  name: 'Banner',
  slot: 'Root',
})<AlertProps>({
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 0,
  paddingBottom: 0,
});

type BannerProps = AlertProps;

const Banner = forwardRef<HTMLDivElement, BannerProps>((props, ref) => {
  return <BannerRoot ref={ref} {...props} />;
});

const EnvBannerRoot = styled(Banner)(({ theme }) => ({
  ...theme.typography.caption,
  height: 28,
}));

const EnvBanner: FC = () => {
  return (
    <EnvBannerRoot severity='warning' icon={false}>
      <Box component='span'>Local development</Box>
      <Box component='span' mx={1}>
        ·
      </Box>
      <Box component='span' fontWeight={600}>
        v{VERSION}
      </Box>
    </EnvBannerRoot>
  );
};

export default EnvBanner;
