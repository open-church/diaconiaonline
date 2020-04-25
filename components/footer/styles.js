import { Container } from '@bootstrap-styled/v4'
import styled from 'styled-components'

import { colors } from '../../utils/variables'

export const Footer = styled.footer`
  background: ${colors.cloudBurst};
  color: ${colors.boulder};
  font-size: 0.75rem;
  height: 40px;
  line-height: 3;
  width: 100%;
`

export const FooterContainer = styled(Container)`
  box-sizing: border-box;
`
