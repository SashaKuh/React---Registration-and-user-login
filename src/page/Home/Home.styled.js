import styled from 'styled-components';

const StyledHome = styled.div`
  text-align: center;
  color: #007aff;
  padding: 50px;

  h1 {
    font-size: 4em;
    font-weight: bold;
  }

  p {
    font-size: 1.5em;
    font-style: italic;
  }
`;

const HomeHeader = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: black;
`;

const HomeParagraph = styled.p`
  font-size: 20px;
  color: black;
`;

export { StyledHome, HomeHeader, HomeParagraph };

