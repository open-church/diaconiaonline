import React, { useEffect, useState } from 'react'

import * as B from '@bootstrap-styled/v4'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import * as E from '../../../components/elements/styles'
import Layout from '../../../components/layout'
import * as Flex from '../../../components/loginStyles/styles'
import * as S from '../../../components/signupStyles/styles'
import Api from '../../../services/api'

function CommunitySuccess ({ credentials }) {
  const [loading, setLoading] = useState(true)
  const [code, setCode] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getCode = async () => {
      const { data } = await Api.getCommunity()
      setLoading(false)
      data.code ? setCode(data.code) : setError(true)
    }
    credentials && credentials.entity === 'community' ? getCode() : Router.push('/login/comunidade')
  }, [])

  return (
    <Layout loading={loading} credentials={credentials}>
      <ThemeProvider theme={{ mode: 'community' }}>
        <Flex.PageContainer fluid>
          <B.Row>
            <Flex.BgCol lg="5" xl="7">
            </Flex.BgCol>
            <B.Col lg="7" xl="5">
              <S.ContentWrapper>
                {error ? (
                  <>
                    <S.H3>Comunidade não encontrada</S.H3>
                  </>
                ) : (
                  <>
                    <S.H3>Cadastro concluído!</S.H3>
                    <S.P>Sua comunidade está registrada em nosso sistema. Agora você pode receber todos os dados de usuários participantes de sua igreja para poder compartilhar recursos.</S.P>
                    <S.P>Para compartilhar o perfil de registro de sua comunidade, utilize o código:</S.P>
                    <S.Code>{code}</S.Code>
                  </>
                ) }
                <S.ButtonsWrapper>
                  <E.CustomButton tag={B.A} href="/dashboard/comunidade" color="info">Acessar Painel</E.CustomButton>
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

CommunitySuccess.propTypes = {
  credentials: PropTypes.object
}

export default CommunitySuccess
