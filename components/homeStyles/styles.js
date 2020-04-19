import { Container, Col } from '@bootstrap-styled/v4'
import styled from 'styled-components'

import { colors } from '../../utils/variables'

export const PageContainer = styled(Container)`
  background: ${colors.blueZodiac};
  height: 100vh;
  max-width: 100vw;
  padding: 0;
  
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
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; 
`

export const BgCol = styled(Col)`
  background: url('./images/diaconia-online-home-bg.png') 100% center/cover;
`

export const H2 = styled.h2`
  color: ${colors.coralRed};
  font-size: 2.75rem;
  line-height: 1.1;
`

export const P = styled.p`
  color: ${colors.white};
  font-size: 20px;
  line-height: 1.5;
`
