
import { Container, Row, Col } from '@bootstrap-styled/v4'
import styled from 'styled-components'

import { colors } from '../../utils/variables'

export const Wrapper = styled.div`
  min-height: calc(100vh - 40px);
`

export const TopContainer = styled(Container)`
  background: ${colors.blueZodiac};
  min-height: 435px;
  padding: 0;
  margin-bottom: -300px;

  @media (max-width: 992px) {
    min-height: 284px;
    margin-bottom: -200px;
  }
`

export const CustomContainer = styled(Container)`
  padding: 0;

  & .row {
    margin: 0;
  }

  & .col {
    padding: 0;

    @media (max-width: 575px ) {
      padding: 0 15px;
    }
  }
`

export const UserBox = styled(CustomContainer)`
  background: ${colors.white};
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(13,2,2,0.41);
  margin-bottom: 80px;
  
  & .col {
    padding: 15px;
  }

  @media (max-width: 768px) {
    width: calc(100% - 30px);
  }
`

export const H1 = styled.h1`
  font-size: 2.8125rem;
  color: ${colors.white};
  line-height: 0.777;
  margin: 0 0 15px;

  @media (max-width: 992px) {
    font-size: 1.25rem;
    line-height: 1.75;
    margin: 0 0 9px;
  }

 
`

export const H2 = styled.h2`
  color: ${colors.blueZodiac};
  font-size: 1.875rem;
  line-height: 1.166;
  margin: 0;

  @media (max-width: 992px) {
    font-size: 1.25rem;
    line-height: 1.75;
  }
`

export const P = styled.p`
  color: ${colors.white};
  font-size: 1.25rem;
  line-height: 1.5;

  @media (max-width: 992px) {
    font-size: 0.875rem;
    line-height: 1.2876;
  }
`

export const KeyValues = styled.p`
  color: ${colors.outerSpace};
  font-size: 1.25rem;
  line-height: 1.5;
  margin: 15px 0 0;
  font-weight: ${({ bold }) => bold ? 'bold;' : 'normal;'}; 
  position: relative;
  ${({ icon }) => icon && 'padding-left: 36px;'};

  &:last-of-type {
    margin-bottom: 15px;
  }

  &::before {
    ${({ icon }) => icon && `content: url("/images/ic-${icon}.svg"); position: absolute; left: 0; top: -2px;`};
  }

  @media (max-width: 992px) {
    font-size: 1rem;
    margin: 8px 0 0;

    &:last-of-type {
      margin-bottom: 8px;
    }
  }

  @media (max-width: 768px) {
    float: ${({ specialFloat }) => specialFloat ? 'inline-start;' : 'none;'}; 
  }
`

export const Values = styled.p`
  color: ${colors.outerSpace};
  font-size: 1.125rem;
  line-height: 1.222;
  margin: 15px 0 0;

  &:last-of-type {
    margin-bottom: 15px;
  }

  @media (max-width: 992px) {
    font-size: 0.875rem;
  }
`

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`

export const InfoBox = styled.div`
  width: calc(25% - 12px);

  @media (max-width: 992px) {
    width: calc(50% - 6px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const SpecialWrapper = styled.div`
  @media (max-width: 768px) {
    float: inline-end;
`
