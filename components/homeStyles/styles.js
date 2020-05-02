import { Container, Col } from '@bootstrap-styled/v4'
import styled from 'styled-components'

import { colors } from '../../utils/variables'

export const PageContainer = styled(Container)`
  background: ${colors.blueZodiac};
  height: calc(100vh - 40px);
  max-width: 100vw;
  padding: 0;

  @media (max-width: 767px) {
    height: auto;
    min-height: calc(100vh - 40px);
  }
  
  & > .row {
    height: 100%;
    margin: 0;
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  max-width: 660px;

  @media (max-width: 992px) {
    justify-content: flex-start;
    margin-top: 15px;
    max-width: none;
    padding-bottom: 30px;
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; 
`

export const BgCol = styled(Col)`
  && {
    background: url('/images/diaconia-online-home-bg.jpg') 100% center/cover;
    min-height: 280px;

    @media (max-width: 992px) {
      background-position: top center;
    }
  }
`

export const H2 = styled.h2`
  color: ${colors.coralRed};
  font-size: 2.75rem;
  line-height: 1.1;

  @media (max-width: 992px) {
    font-size: 1.87rem;
    margin: 0 0 15px 0;
  }
`

export const P = styled.p`
  color: ${colors.white};
  font-size: 1.25rem;
  line-height: 1.5;
  margin-top: 0;

  @media (max-width: 992px) {
    font-size: 0.93rem;
  }
`
