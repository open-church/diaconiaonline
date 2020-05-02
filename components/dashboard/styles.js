import Select from 'react-select'

import { Container } from '@bootstrap-styled/v4'
import styled from 'styled-components'

import { colors } from '../../utils/variables'

export const Wrapper = styled.div`
  min-height: calc(100vh - 40px);
`

export const TopContainer = styled(Container)`
  background: ${colors.blueZodiac};
  padding: 0;
  ${({ community }) => community
    ? 'margin-bottom: -430px; min-height: 565px;'
    : 'margin-bottom: -300px; min-height: 435px;'};
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
    padding: 30px;
  }
  @media (max-width: 768px) {
    width: calc(100% - 30px);
    & .col {
      padding: 15px;
    }
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
  }
`

export const MoneyWrapper = styled(Container)`
  align-items: center;
  background: ${colors.burningOrange};
  border-radius: 3px;
  display: flex;
  justify-content: center;
  margin: 15px auto;
  padding: 0;
  position: relative;
  h2 {
    color: ${colors.white};
    font-size: 3.75rem;
    line-height: 1.3;
    margin: 15px 0 10px;
    text-align: center;
  }
  p {
    color: ${colors.white};
    font-size: 1.25rem;
    line-height: 1.75;
    margin: 0 0 15px;
    text-align: center;
  }
  img {
    position: absolute;
    right: 5px;
    top: 15px;
  }
  @media (max-width: 768px) {
    width: calc(100% - 30px);
  }
`

export const ItemsWrapper = styled(Container)`
  padding: 0;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: calc(100% - 30px);
  }
`

export const ItemBox = styled.div`
  width: calc(33.33% - 20px);
  background: ${colors.matisse};
  border-radius: 3px;
  padding: 15px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  min-height: 134px;
  img {
  align-self: flex-start;
  }
  & > div {
    align-self: flex-end;
  }
  h2 {
    color: ${colors.brightSun};
    font-size: 2.5rem;
    line-height: 1;
    margin: 0 0 10px;
    text-align: right;
  }
  p {
    color: ${colors.white};
    line-height: 1.5;
    margin: 0;
    text-align: right;
  }
`

export const CardsWrapper = styled(Container)`
  padding: 0;
  display: flex;
  justify-content: space-between;
  margin: 15px auto;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    width: calc(100% - 30px);
  }
`

export const CustomSelect = styled(Select)`
  width: 100%;
  margin-bottom: 30px;
  .react-select {
    &__control {
      border: none;
      box-shadow: 0 3px 6px rgba(13,2,2,0.30);
    }
  }
`

export const Card = styled.div`
  padding: 10px;
  box-shadow: 0 3px 6px rgba(13,2,2,0.30);
  width: calc(25% - 9px);
  box-sizing: border-box;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 992px) {
    width: calc(50% - 4.5px);
    margin-bottom: 9px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const CardIcon = styled.div`
  background: ${colors.concrete};
  width: 33px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
`

export const CardTitle = styled.div`
  width: calc(100% - 48px);
  h3 {
    color: ${colors.blueZodiac};
    line-height: 1.125;
    margin: 0;
  }
  p {
    color: ${colors.outerSpace};
    margin: 0;
    line-height: 1.5;
  }
`

export const CardHr = styled.hr`
  color: ${colors.boulder};
  width: 100%;
  opacity: 0.2;
  margin: 15px 0;
`

export const CardPhone = styled.p`
  font-weight: bold;
  margin: 0 15px 15px 0;
  font-size: 0.875rem;
  flex: 1;
`

export const CardHighlight = styled.div`
  margin-bottom: 10px;
`

export const Highlight = styled.p`
  position: relative;
  font-size: 0.875rem;
  margin: 0;
  padding-left: 20px;
  &::before {
    ${({ icon }) => icon &&
      `background-image: url("/images/ic-${icon}.svg");
        width: 18px;
        height: 18px;
        content: "";
        background-size: 18px;
        position: absolute;
        left: 0;`
  }
`
