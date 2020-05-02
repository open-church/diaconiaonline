import React from 'react'

import * as B from '@bootstrap-styled/v4'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import * as E from '../../../components/elements/styles'
import Layout from '../../../components/layout'
import * as Flex from '../../../components/loginStyles/styles'
import * as S from '../../../components/signupStyles/styles'

function CommunityLogin (props) {
  return (
    <Layout>
      <ThemeProvider theme={{ mode: 'community' }}>
        <Flex.PageContainer fluid>
          <B.Row>
            <Flex.BgCol lg="5" xl="7">
            </Flex.BgCol>
            <B.Col lg="7" xl="5">
              <S.ContentWrapper>
                <S.H3>Cadastro concluído!</S.H3>
                <S.P>Sua comunidade está registrada em nosso sistema. Agora você pode receber todos os dados de usuários participantes de sua igreja para poder compartilhar recursos.</S.P>
                <S.P>Para compartilhar o perfil de registro de sua comunidade, utilize o código:</S.P>
                <S.Code>351615</S.Code>
                <S.ButtonsWrapper>
                  <E.CustomButton tag={B.A} href="/login/comunidade" color="info">Fazer login</E.CustomButton>
                  <E.CustomButton tag={B.A} href="/" color="danger">Página Inicial</E.CustomButton>
                </S.ButtonsWrapper>
              </S.ContentWrapper>
            </B.Col>
          </B.Row>
        </Flex.PageContainer>
      </ThemeProvider>
    </Layout>
  )
}

CommunityLogin.propTypes = {
  credentials: PropTypes.object
}

export default CommunityLogin
