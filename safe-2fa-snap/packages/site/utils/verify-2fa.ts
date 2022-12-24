import totp from 'totp-generator'

export const verify2fa = async (userId: string, userCode: string) => {
  const code = totp('ETHPRICE')
  if (code == userCode) {
    return true
  }
  return false
};
