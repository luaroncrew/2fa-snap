import styled from 'styled-components';

const StepRound = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 30px;
  border: solid 2px white
  background-color: rgba(191, 186, 186, 0.5);
`;

const Bar = styled.div`
  height: 2px;
  width: 100%;
  background-color: black;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProgressiveBar = () => {
  return (
    <Wrapper>
      <StepRound />
      <Bar />
      <StepRound />
      <Bar />
      <StepRound />
    </Wrapper>
  );
};

export default ProgressiveBar;
