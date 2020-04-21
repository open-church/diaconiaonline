import { Button } from '@bootstrap-styled/v4'
import styled from 'styled-components'

export const CustomButton = styled(Button)`
  && {
    font-size: 1.25rem;
    line-height: 1.35;
    height: 60px;
    width: ${({ width }) => width || '48%'}; 
    max-width: 310px;
  }

  @media (max-width: 768px) {
    &.btn {
      max-width: none;
      width: ${({ width }) => '100%'}; 
    }
      &:first-child {
        margin-bottom: 15px;
      }
  }
`
