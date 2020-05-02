import styled from 'styled-components'

import { colors } from '../../utils/variables'

export const Wrapper = styled.div`
  align-items: center;
  background: ${colors.white};
  display: flex;
  height: 100vh;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 10;
`

export const Brand = styled.img`
  height: 70px;
`
