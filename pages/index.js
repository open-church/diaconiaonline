import React from 'react'

import * as B from '@bootstrap-styled/v4'

import * as E from '../components/elements/styles'
import * as S from '../components/homeStyles/styles'

function HomePage () {
  return (
    <S.PageContainer fluid>
      <B.Row>
        <S.BgCol lg="5" xl="6">
        </S.BgCol>
        <B.Col lg="7" xl="6">
          <S.ContentWrapper>
            <S.H2>Organize e acompanhe os recursos de sua comunidade com um clique.</S.H2>
            <S.P>Com o Diaconia Online você pode gerir os recursos de sua comunidade e fazer a assistência de seus membros, apenas acessando a plataforma sem nenhum custo. Cadastre-se e aproveite as nossas funcionalidades.</S.P>
            <S.ButtonsWrapper>
              <E.CustomButton color="info">Entrar como igreja</E.CustomButton>
              <E.CustomButton color="secondary">Entrar como membro</E.CustomButton>
            </S.ButtonsWrapper>
          </S.ContentWrapper>
        </B.Col>
      </B.Row>
    </S.PageContainer>
  )
}

export default HomePage
