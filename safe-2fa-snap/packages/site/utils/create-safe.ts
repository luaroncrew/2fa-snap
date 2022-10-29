import Safe, { SafeFactory, SafeAccountConfig } from '@gnosis.pm/safe-core-sdk';
import { getEthersAdapter } from './get-ethers-adapter';

export const createSafe = async () => {
  const ethAdapter = await getEthersAdapter();
  const safeFactory = await SafeFactory.create({ ethAdapter });
  const signerOwner = await ethAdapter.getSigner().getAddress();
  const owners = [signerOwner, '0x29074B185F17D7ba1327483dF3DF392e5D0937ec'];
  const threshold = 2;
  const safeAccountConfig: SafeAccountConfig = {
    owners,
    threshold
  };

  const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig })
  console.log(safeSdk);
  const newSafeAddress = safeSdk.getAddress();
  console.log(newSafeAddress);
  return newSafeAddress;
};
