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

import * as S from './styles'

function Navbar () {
  const [open, setOpen] = useState(false)
  return (
    <S.Navbar fixed="top" toggleable="lg" className={open ? 'open' : ''}>
      <Container>
        <div className={'d-flex justify-content-between'}>
          <NavbarBrand tag={A} href="/">
            <S.Image src="./images/diaconia-online.svg" alt="Diaconia Online"/>
          </NavbarBrand>
          <NavbarToggler className={open ? 'close' : ''} onClick={() => setOpen(!open)} />
        </div>
        <Collapse navbar isOpen={open}>
          <Nav navbar className="ml-auto my-2 my-lg-0">
            <NavItem>
              <S.NavLink href="/quem-somos">Quem somos</S.NavLink>
            </NavItem>
            <NavItem>
              <S.NavLink href="/ajuda">Ajuda</S.NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </S.Navbar>
  )
}

export default Navbar
