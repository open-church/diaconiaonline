import { Button } from '@bootstrap-styled/v4'
import styled from 'styled-components'

export const CustomButton = styled(Button)`
  &.btn {
    font-size: 1.25rem;
    line-height: 1.35;
    height: 60px;
    width: 47%;
    max-width: 310px; 
  }

  @media (max-width: 768px) {
    &.btn {
      max-width: none;
      width: 100%
    }
      &:first-child {
        margin-bottom: 15px;
      }
  }
`
