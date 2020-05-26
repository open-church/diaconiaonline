import React, { useEffect, useState } from 'react'

import * as B from '@bootstrap-styled/v4'
import { Formik, Form } from 'formik'
import Link from 'next/link'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import Alert from '../../../components/alert'
import * as E from '../../../components/elements/styles'
import Layout from '../../../components/layout'
import * as S from '../../../components/loginStyles/styles'
import { saveCredentials } from '../../../helpers/auth'
import { LoginSchema } from '../../../schemas/login'
import Api from '../../../services/api'

function CommunityLogin (props) {
  const [loading, setLoading] = useState(true)
  const [feedbackMessage, setFeedbackMessage] = useState({ show: false, message: '' })

  useEffect(() => {
    const { credentials } = props
    if (credentials && credentials.entity) {
      credentials.entity === 'people' && Router.push('/dashboard/pessoa')
      credentials.entity === 'community' && Router.push('/dashboard/comunidade')
    } else {
      setLoading(false)
    }
  }, [])

  const login = async values => {
    try {
      setLoading(true)
      const { data } = await Api.login({ ...values, entity: 'community' })
      if (!data.email) throw new Error(data.message)
      await saveCredentials({ ...data })
      Router.push('/dashboard/comunidade')
    } catch (err) {
      window.scrollTo(0, 0)
      setFeedbackMessage({ show: true, message: err.message })
      console.log('err', err)
      setLoading(false)
    }
  }

  return (
    <Layout loading={loading}>
      <ThemeProvider theme={{ mode: 'community' }}>
        <S.PageContainer fluid>
          <B.Row>
            <S.BgCol lg="5" xl="7">
            </S.BgCol>
            <B.Col lg="7" xl="5">
              <S.ContentWrapper>
                <S.H3>Faça o login</S.H3>
                <S.P>Informe seu e-mail e senha nos campos indicados para continuar.</S.P>
                {feedbackMessage.show && <Alert message={feedbackMessage.message} type="error" />}
                <Formik
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={login}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <S.Label htmlFor="email">E-mail</S.Label>
                      <S.CustomField name="email" type="email" placeholder="Insira seu e-mail" />
                      {errors.email && touched.email ? <S.Error>{errors.email}</S.Error> : null}
                      <S.Label htmlFor="password">Senha</S.Label>
                      <S.CustomField name="password" placeholder="Insira sua senha" type="password" />
                      {errors.password && touched.password ? (
                        <S.Error>{errors.password}</S.Error>
                      ) : null}
                      <Link href='/login/comunidade/nova-senha'><S.Forgot title="Esqueci a senha">Esqueci minha senha</S.Forgot></Link>
                      <S.ButtonsWrapper>
                        <E.CustomButton width="42%" type="submit" color="info">Fazer login</E.CustomButton>
                        <E.CustomButton tag={B.A} href="/cadastro/comunidade" width="54%" color="danger">Cadastrar comunidade</E.CustomButton>
                      </S.ButtonsWrapper>
                    </Form>
                  )}
                </Formik>
              </S.ContentWrapper>
            </B.Col>
          </B.Row>
        </S.PageContainer>
      </ThemeProvider>
    </Layout>
  )
}

CommunityLogin.propTypes = {
  credentials: PropTypes.object
}

export default CommunityLogin
