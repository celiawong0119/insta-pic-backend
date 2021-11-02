import { generateHashedPassword, verifyPassword } from '../utils/authUtils';

describe('verifyPassword', () => {
  it('should verify a password', async () => {
    const pw = await generateHashedPassword('Aa1234');
    const isPwCorrect = await verifyPassword('Aa1234', pw);
    expect(isPwCorrect).toEqual(true);
  });
});
