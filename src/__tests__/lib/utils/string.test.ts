import { securizeString } from '@utils/string';

describe('String utils', () => {
  test('Should secure string', () => {
    const securizedString = securizeString('   HolA mUNdO  ');
    expect(securizedString).toBe('hola mundo');
  });
});
