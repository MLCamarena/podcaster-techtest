import PageContainer from '@components-ui/PageContainer/PageContainer';
import { render } from '@testing-library/react';

describe('PageContainer', () => {
  test('PageContainer render properly', () => {
    const { baseElement } = render(<PageContainer />);
    expect(baseElement).toBeTruthy();
  });

  test('Should render the received child', () => {
    const { container } = render(
      <PageContainer>
        <h1>Hola</h1>
      </PageContainer>,
    );
    expect(container.innerHTML).toContain('<h1>Hola</h1>');
  });
});
