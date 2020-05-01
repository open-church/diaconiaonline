import Select from 'react-select'

import { Container, Col } from '@bootstrap-styled/v4'
import { Field, Form } from 'formik'
import styled from 'styled-components'
import theme from 'styled-theming'

import { colors } from '../../utils/variables'

const color = theme('mode', {
  user: colors.blueZodiac,
  community: colors.burningOrange
})

export const PageContainer = styled(Container)`
  && {
    box-sizing: border-box;
    max-width: 1280px;
    min-height: calc(100vh - 40px);
  }

  & > .row {
    height: 100%;
    margin: 0;
  }

  @media (max-width: 992px) {
    padding: 0;
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;

  @media (max-width: 992px) {
    background: ${colors.white};
    border-radius: 3px;
    box-shadow: 0 3px 6px rgba(13,2,2,0.41);
    height: auto;
    justify-content: flex-start;
    margin: 80px 0 30px;
    max-width: none;
    padding: 15px;
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; 
  margin: 45px 0 30px;
  width: 100%;
`

export const BgCol = styled(Col)`
  && {
    background: url('/images/diaconia-online-formas-bg.jpg') center 20px/contain no-repeat;
  }
`

export const H3 = styled.h3`
  color: ${color};
  font-size: 1.875rem;
  line-height: 1.666;
`

export const H4 = styled.h4`
  color: ${color};
  font-size: 1.5625rem;
  line-height: 1.666;
  width: 100%;
`

export const Code = styled.h4`
  color: ${color};
  font-size: 2.5rem;
  line-height: 0.5;
  margin: 15px 0;
  text-align: center;
  width: 100%;
`

export const P = styled.p`
  color: ${colors.outerSpace};
  font-size: 20px;
  line-height: 1.5;
`

export const CustomForm = styled(Form)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  
`

export const CustomField = styled(Field)`
  width: 100%;
  padding: 15px 25px;
  border: solid 1px ${color};
  border-radius: 3px;

  &::placeholder {
    color: ${colors.outerSpace};
    font-style: italic;
  }
`

export const Label = styled.label`
  position: relative;
  ${({ width }) =>
    width ? `width: calc(${width} - 8px);` : 'width: 100%;'}


  legend {
    line-height: 1.375;
    margin: 15px 0;
    color: ${colors.outerSpace};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const Error = styled.span`
  color: ${colors.coralRed};
  display: block;
  font-size: 0.85rem;
  position: absolute;
  right: 0;
`

export const CheckBoxLabel = styled.label`
  cursor: pointer;
  display: block;
  font-size: 1rem;
  margin: 15px 0;
  padding-left: 30px;
  position: relative;
  user-select: none;

  &:hover input + span {
    background-color: ${colors.boulder};
  }
`

export const CustomCheckbox = styled.input.attrs(props => ({
  type: 'checkbox'
}))`
  cursor: pointer;
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;

  &:checked {
    & + span {
      background-color: ${colors.outerSpace};
    }
    & + span:after {
      display: block;
    }
  }
`

export const Checkmark = styled.span`
  position: absolute;
  top: 2px;
  left: 0;
  height: 20px;
  width: 20px;
  border: solid 2px ${colors.outerSpace};
  

  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 5px;
    top: 1px;
    width: 6px;
    height: 12px;
    border: solid ${colors.wildSand};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`

export const TermsLink = styled.span`
  color: ${colors.burningOrange};
`

export const CustomSelect = styled(Select)`
  .react-select__control {
    border-radius: 3px;
    border: solid 1px ${colors.blueZodiac};
    font-size: 16px;
    margin-top: 8px;
    min-height: 50.4px;

    .react-select__value-container {
      padding: 2px 15px;

      .react-select__single-value,
      .react-select__placeholder {
        margin-left: 0;
      }
    }

    .react-select__indicator-separator {
      display: none;
    }

    &:hover {
      border-color: ${colors.blueZodiac};
    }

    &--is-disabled {
      background-color: ${colors.alto}
    }
  }
`

export const CustomFieldSet = styled.fieldset`
  border: none;
  margin: 15px 0;
  padding: 0;
  position: relative;
    ${({ width }) =>
      width ? `width: calc(${width} - 8px);` : 'width: 100%;'}
    }

  legend {
    line-height: 1.375;
    margin-bottom: 20px;
    color: ${colors.outerSpace};
  }

  & > div {
    display: flex;
    justify-content: space-between;
  }

  label {
    width: 50%;
    display: flex;
    align-items: center;

    input {
      margin-right: 8px;
    }
  }
`
