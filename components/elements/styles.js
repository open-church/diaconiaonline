import { Button } from '@bootstrap-styled/v4'
import styled from 'styled-components'

export const CustomButton = styled(Button)`
  && {
    font-size: 1.10rem;
    line-height: 60px;
    height: 60px;
    width: ${({ width }) => width || '48%'}; 
    max-width: 310px;
    padding: 0 10px;
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
