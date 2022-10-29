import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ReactComponent as VaultLogo } from '../assets/vault_logo.svg';
import InputText from './InputText';
import CustomButton from './CustomButton';

type ThirdStepProps = {
  safeName: string;
  ownerAddress: string;
  iExecAddress: string;
  setiExecAddress: (address: string) => void;
  onSubmit: () => void;
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const ThirdStep = ({
  safeName,
  ownerAddress,
  iExecAddress,
  setiExecAddress,
  onSubmit,
}: ThirdStepProps) => {
  const [disable, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (iExecAddress.length > 0) {
      setDisabled(false);
    }
  }, [iExecAddress]);

  return (
    <>
      <h1>Third step</h1>
      <VaultLogo />
      <h2>2FA SAFE Creation</h2>
      <FormContainer>
        <InputText input={safeName} placeHolder={'SAFE Name'} disabled={true} />
        <InputText
          input={ownerAddress}
          placeHolder={"Owner 1's address"}
          disabled={true}
        />
        <InputText
          input={iExecAddress}
          setInput={setiExecAddress}
          placeHolder={'iExec’s address: to be verified'}
        />
        <CustomButton
          disabled={disable}
          content={'Deploy Contract'}
          onSubmit={onSubmit}
        />
      </FormContainer>
    </>
  );
};

export default ThirdStep;
