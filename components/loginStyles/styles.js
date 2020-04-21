import { Container, Col } from '@bootstrap-styled/v4'
import { Field } from 'formik'
import styled from 'styled-components'

import { colors } from '../../utils/variables'

export const PageContainer = styled(Container)`
  background: ${colors.wildSand};
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
  max-width: 540px;

  @media (max-width: 992px) {
    background: ${colors.white};
    border-radius: 3px;
    box-shadow: 0 3px 6px rgba(13,2,2,41);
    height: auto;
    justify-content: flex-start;
    margin: -125px 0 30px;
    max-width: none;
    padding: 15px;
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; 
  margin-top: 15px;
`

export const BgCol = styled(Col)`
  && {
    background: url('../images/diaconia-online-login-bg.png') center/cover;
    min-height: 284px;
  }
`

export const H3 = styled.h2`
  color: ${colors.blueZodiac};
  font-size: 1.875rem;
  line-height: 1.666;
`

export const P = styled.p`
  color: ${colors.blueZodiac};
  font-size: 20px;
  line-height: 1.5;
`

export const CustomField = styled(Field)`
  width: 100%;
  padding: 15px 25px;
  border: solid 1px ${colors.blueZodiac};
  border-radius: 3px;

  &::placeholder {
    color: ${colors.outerSpace};
    font-style: italic;
  }
`

export const Label = styled.label`
  display: inline-block;
  line-height: 1.375;
  margin: 15px 0;
  color: ${colors.outerSpace};
`

export const Error = styled.span`
  font-size: 0.85rem;
  color: ${colors.coralRed};
  float: inline-end;
`

export const Forgot = styled.a`
  color: ${colors.blueZodiac};
  display: inline-block;
  line-height: 1.375;
  margin: 15px 0;
`
