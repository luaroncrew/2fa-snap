import styled from 'styled-components';
import { useState } from 'react';
import FirstStep from '../components/FirstStep';
import SecondStep from '../components/SecondStep';
import ThirdStep from '../components/ThirdStep';
import ProgressiveBar from '../components/ProgressiveBar';
import { generate2fa } from '../../utils/generate-2fa';
import { verify2fa } from '../../utils/verify-2fa';
import {ethers} from "ethers";
import {createSafe} from "../../utils/create-safe";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const FlexBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OnBoarding = () => {
  const [step, setStep] = useState<number>(1);
  const [safeName, setSafeName] = useState<string>('');
  const [ownerAddress, setOwnerAddress] = useState<string>('');
  const [iExecAddress, setiExecAddress] = useState<string>('');
  const [url2FA, setUrl2FA] = useState<string>('');
  const [totp, setTotp] = useState('');

  const nextStep = () => {
    step < 3 ? setStep(step + 1) : setStep(1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmitFirstStep = async () => {
    const accounts = (await window.ethereum.request({
      method: 'eth_requestAccounts',
    })) as any[];

    if (!accounts) {
      alert('You have to select 1 account');
      return;
    }

    const data2Fa = await generate2fa(accounts[0]);
    const { secret, iExecPubKey } = data2Fa.data.getSecretById;
    const address = ethers.utils.computeAddress( iExecPubKey )
    setUrl2FA(`otpauth://totp/De2FA?secret=${secret}&issuer=Example`);
    setiExecAddress(address);
    console.log({ iExecAddress: address });
    nextStep();
  };

  const onSubmitSecondStep = async () => {
    const accounts = (await window.ethereum.request({
      method: 'eth_requestAccounts',
    })) as any[];

    if (!accounts) {
      alert('You have to select 1 account');
      return;
    }

    const res = await verify2fa(accounts[0], totp);

    if(!res.data.checkSecret) {
      alert("Code isn't valid")
      return
    }
    nextStep();
  };

  const onSubmitThirdStep = async () => {
    try {
      const newSafeAddress = await createSafe(iExecAddress);
      localStorage.setItem('safe-address', newSafeAddress);
      console.log({ newSafeAddress });
      alert('Your safe Address');
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Container>
      <ProgressiveBar step={step} />
      <FlexBox>
        {step === 1 && (
          <FirstStep
            safeName={safeName}
            setSafeName={setSafeName}
            ownerAddress={ownerAddress}
            setOwnerAddress={setOwnerAddress}
            onSubmit={onSubmitFirstStep}
          />
        )}
        {step === 2 && (
          <SecondStep
            onSubmit={onSubmitSecondStep}
            previous={handlePrevious}
            url2FA={url2FA}
            setTotp={setTotp}
          />
        )}
        {step === 3 && (
          <ThirdStep
            safeName={safeName}
            setiExecAddress={setiExecAddress}
            ownerAddress={ownerAddress}
            iExecAddress={iExecAddress}
            onSubmit={onSubmitThirdStep}
            previous={handlePrevious}
          />
        )}
      </FlexBox>
    </Container>
  );
};

export default OnBoarding;
