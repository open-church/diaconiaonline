import {
  NavLink as BNavLink,
  Navbar as BNavbar
} from '@bootstrap-styled/v4'
import styled from 'styled-components'

import { colors } from '../../utils/variables'

export const Navbar = styled(BNavbar)`
  && {
    position: fixed;
    width: calc(100% - 30px);
    z-index: 10;
    
    ${({ bgActive }) => bgActive && `
      background: ${colors.white};
      box-shadow: 1px 1px 4px ${colors.alto};
    `};
  }

  &.open {
    background: ${colors.cloudBurst};
    height: 100vh;
  }

  .navbar-toggler {
    cursor: pointer
  }

  .navbar-toggler-icon {
    background: url('/images/ic-menu.svg') center / contain no-repeat;
    position: relative;
    z-index: 10;

  }
  .close .navbar-toggler-icon {
    background-image: url('/images/ic-close.svg');
  }
`

export const Image = styled.img`
  height: 26px;
  position: relative;
  z-index: 10;
`

export const NavLink = styled(BNavLink)`
  &&&& {
    color: ${colors.burningOrange};
    font-size: 1rem;
    letter-spacing: 0;

    @media (max-width: 992px) {
      color: ${colors.white};
      font-size: 1.25rem;
    }

    &:hover {
      color: ${colors.burningOrange};

      @media (max-width: 992px) {
        color: ${colors.white};
      }
    }
  }
`
