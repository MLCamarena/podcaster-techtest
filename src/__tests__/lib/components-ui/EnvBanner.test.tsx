import EnvBanner from '@components-ui/EnvBanner/EnvBanner';
import { VERSION } from '@config/version';
import { render, screen } from '@testing-library/react';

describe('EnvBanner', () => {
  test('EnvBanner render properly', () => {
    const { baseElement } = render(<EnvBanner />);
    expect(baseElement).toBeTruthy();
  });

  test('Should render the current version', () => {
    render(<EnvBanner />);
    expect(screen.getByText(`v${VERSION}`)).toBeInTheDocument();
  });
});
