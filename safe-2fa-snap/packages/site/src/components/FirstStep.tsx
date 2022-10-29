import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ReactComponent as SafeLogo } from '../assets/safe_logo.svg';
import PrimaryButton from './PrimaryButton';
import InputText from './InputText';

type FirstStepProps = {
  safeName: string;
  setSafeName: (name: string) => void;
  ownerAddress: string;
  setOwnerAddress: (address: string) => void;
  onSubmit: () => void;
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const FirstStep = ({
  safeName,
  setSafeName,
  setOwnerAddress,
  ownerAddress,
  onSubmit,
}: FirstStepProps) => {
  const [disable, setDisabled] = useState<boolean>(true);
  const [iExecAddress, setiExecAddress] = useState<string>('');

  useEffect(() => {
    if (ownerAddress.length > 0 && safeName.length > 0) {
      return setDisabled(false);
    }
    return setDisabled(true);
  }, [ownerAddress, iExecAddress, safeName]);
  return (
    <>
      <h1>First step</h1>
      <SafeLogo witdh={'50px'} />
      <h2>SAFE setup</h2>
      <FormContainer>
        <InputText
          input={safeName}
          setInput={setSafeName}
          placeHolder={'SAFE Name'}
        />
        <InputText
          input={ownerAddress}
          setInput={setOwnerAddress}
          placeHolder={"Owner 1's address"}
        />
        <InputText
          input={iExecAddress}
          setInput={setiExecAddress}
          placeHolder={'iExec’s address: to be verified'}
          disabled={true}
        />
        <PrimaryButton
          disabled={disable}
          content={'Setup iExec address'}
          onSubmit={onSubmit}
        />
      </FormContainer>
    </>
  );
};

export default FirstStep;
