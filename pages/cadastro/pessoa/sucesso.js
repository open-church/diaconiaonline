import React from 'react'

import * as B from '@bootstrap-styled/v4'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import * as E from '../../../components/elements/styles'
import Layout from '../../../components/layout'
import * as Flex from '../../../components/loginStyles/styles'
import * as S from '../../../components/signupStyles/styles'

function PeopleSuccess (props) {
  return (
    <Layout>
      <ThemeProvider theme={{ mode: 'user' }}>
        <Flex.PageContainer fluid>
          <B.Row>
            <Flex.BgCol lg="5" xl="7">
            </Flex.BgCol>
            <B.Col lg="7" xl="5">
              <S.ContentWrapper>
                <S.H3>Cadastro concluído!</S.H3>
                <S.P>Agora sua comunidade está com o seu registro em mãos. Em breve você receberá um contato dos responsáveis por sua comunidade para discutir os próximos passos para as suas necessidades.</S.P>
                <S.P>Se precisar editar ou atualizar os dados de seu cadastro, basta fazer o login através do botão indicado.</S.P>
                <S.ButtonsWrapper>
                  <E.CustomButton tag={B.A} href="/login/pessoa" color="primary">Fazer login</E.CustomButton>
                  <E.CustomButton tag={B.A} href="/" color="secondary">Página Inicial</E.CustomButton>
                </S.ButtonsWrapper>
              </S.ContentWrapper>
            </B.Col>
          </B.Row>
        </Flex.PageContainer>
      </ThemeProvider>
    </Layout>
  )
}

PeopleSuccess.propTypes = {
  credentials: PropTypes.object
}

export default PeopleSuccess
