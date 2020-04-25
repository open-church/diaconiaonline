import React from 'react'

import * as B from '@bootstrap-styled/v4'
import { Formik, Form } from 'formik'
import Link from 'next/link'
import { ThemeProvider } from 'styled-components'

import * as E from '../../components/elements/styles'
import Layout from '../../components/layout'
import * as S from '../../components/loginStyles/styles'
import { LoginSchema } from '../../schemas/login'

function UserLogin () {
  return (
    <Layout>
      <ThemeProvider theme={{ mode: 'user' }}>
        <S.PageContainer fluid>
          <B.Row>
            <S.BgCol lg="5" xl="7">
            </S.BgCol>
            <B.Col lg="7" xl="5">
              <S.ContentWrapper>
                <S.H3>Faça o login</S.H3>
                <S.P>Informe seu e-mail e senha nos campos indicados para continuar.</S.P>
                <Formik
                  initialValues={{
                    email: '',
                    password: ''
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={values => {
                    // same shape as initial values
                    console.log(values)
                  }}
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
                      <Link href='/'><S.Forgot>Esqueci minha senha</S.Forgot></Link>
                      <S.ButtonsWrapper>
                        <E.CustomButton width="42%" type="submit" color="primary">Fazer login</E.CustomButton>
                        <E.CustomButton width="54%" color="secondary">Cadastrar como usuário</E.CustomButton>
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

export default UserLogin
