import Appbar from '@components-ui/Appbar/Appbar';
import { render } from '@testing-library/react';

describe('Appbar', () => {
  test('Appbar render properly', () => {
    const { baseElement } = render(<Appbar />);
    expect(baseElement).toBeTruthy();
  });
});
