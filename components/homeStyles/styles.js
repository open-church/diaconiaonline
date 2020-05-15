import { Container, Col, Row } from '@bootstrap-styled/v4'
import styled from 'styled-components'

import { colors } from '../../utils/variables'

export const Wrapper = styled.div`
  padding-top: 60px;

  @media(max-width: 768px) {
    .container {
      width: calc(100% - 30px);
    }
  }
`

export const CustomContainer = styled(Container)`
  background: ${({ bg }) => bg ? `linear-gradient(90deg, transparent 50%, ${colors[bg]} 50%);` : 'transparent;'}; 
  width: auto;

  @media (max-width: 992px) {
    background: ${({ bg }) => bg ? `linear-gradient(180deg, transparent 50%, ${colors[bg]} 50%);` : 'transparent;'}; 
  }
  @media (max-width: 768px) {
    background: ${({ bg }) => bg ? `linear-gradient(180deg, transparent 35%, ${colors[bg]} 0%);` : 'transparent;'}; 
  }
`

export const GrayContainer = styled(Container)`
  background: ${colors.alto};
  width: auto; 
`

export const CustomRow = styled(Row)`
  padding: 20px 0;
`

export const BlueCol = styled(Col)`
  display: flex;
  align-items: flex-end;
  background: linear-gradient(90deg,transparent 50%,#12648B 50%);
  justify-content: center;

  @media (max-width: 992px) {
    background: transparent;
    margin: 30px 0;
  }
`

export const H2 = styled.h2`
  color: ${({ color }) => color ? `${colors[color]};` : ` ${colors.coralRed};`}; 
  font-size: 2.75rem;
  line-height: 1.1;
  @media (max-width: 992px) {
    font-size: 1.87rem;
    margin: 0 0 15px 0;
  }
`

export const H3 = styled.h3`
  color: ${({ color }) => color ? `${colors[color]};` : ` ${colors.coralRed};`}; 
  font-size: 1.875rem;
  line-height: 1.6;
  margin: 30px 0 0;
  @media (max-width: 992px) {
    font-size: 1.25rem;
    margin: 15px 0 0;
  }
`

export const P = styled.p`
  color: ${({ color }) => color ? `${colors[color]};` : ` ${colors.outerSpace};`}; 
  font-size: 1rem;
  line-height: 1.5;
  margin-top: 0;
  @media (max-width: 992px) {
    font-size: 0.93rem;
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; 
`

export const Img = styled.img`
  max-width: 100%;
`

export const StepsCol = styled(Col)`

  &&& {
    box-shadow: 5px 5px 20px rgba(0,0,0,0.30);;
    padding: 15px;  
    margin: 0 10px;
    text-align: center;
    max-width: calc(25% - 20px);

    @media (max-width: 992px) {
      max-width: calc(50% - 20px);
      margin: 10px;
      flex: 50%;
    }

    @media (max-width: 640px) {
      max-width: 100%;
      flex: 100%;
    }
  }
`

export const ImgSteps = styled(Img)`
  max-height: 200px;
`

export const PStepes = styled.p`
  color: ${colors.outerSpace};
  font-size: 0.875rem;
  line-height: 1.5;
  margin-top: 24px;
  text-align: left;
`
