import styled from 'styled-components'

import { colors } from '../../utils/variables'

export const Card = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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
  width: calc(100% - 43px);
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

export const CardSub = styled.p`
  font-weight: bold;
  margin: 0 0 15px 0;
  font-size: 0.875rem;
`

export const CardHighlight = styled.div`
  display: flex;
  margin-bottom: 10px;
`

export const Highlight = styled.p`
  position: relative;
  font-size: 0.875rem;
  margin: 0;
  padding-left: 20px;
  
  &:first-child {
    margin-right: 20px;
  }

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
  }
`

export const CardRow = styled.div`
  width: 100%;
  display: flex;

  & > div {
    flex: 0.7;

    &:not(:first-of-type) {
      margin-left: 15px;
      flex: 1;
    }
  }

  p {
    font-size: 0.875rem;
    margin: 0;
  }

  @media(max-width: 768px) {
    display: block;
    
    && div {
      margin: 10px 0; 
    }
  }
`
