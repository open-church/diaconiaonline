import React, { useState } from 'react'

import {
  A,
  Container,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem
} from '@bootstrap-styled/v4'
import PropTypes from 'prop-types'

import { logout } from '../../helpers/auth'
import * as S from './styles'

function Navbar ({ credentials, bgactive }) {
  const [open, setOpen] = useState(false)

  return (
    <S.Navbar fixed="top" toggleable="lg" className={open ? 'open' : ''} bgactive={bgactive}>
      <Container>
        <div className="d-flex justify-content-between">
          <NavbarBrand tag={A} href="/" title="Acessar página inicial">
            <S.Image src="/images/diaconia-online.svg" alt="Diaconia Online"/>
          </NavbarBrand>
          <NavbarToggler className={open ? 'close' : ''} onClick={() => setOpen(!open)} title={open ? 'Fechar' : 'Abrir'}/>
        </div>
        <Collapse navbar isOpen={open}>
          <Nav navbar className="ml-auto my-2 my-lg-0">
            <NavItem>
              <S.NavLink href="/#sobre-diaconia-online" title="Quem somos">Quem somos</S.NavLink>
            </NavItem>
            {credentials && credentials.token && (
              <NavItem>
                <S.NavLink href='/' onClick={logout} title="Sair">Sair</S.NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Container>
    </S.Navbar>
  )
}

Navbar.propTypes = {
  credentials: PropTypes.object,
  bgactive: PropTypes.bool
}

export default Navbar
