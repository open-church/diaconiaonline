import React from 'react'

import * as B from '@bootstrap-styled/v4'
import { Formik } from 'formik'
import { ThemeProvider } from 'styled-components'

import * as E from '../../components/elements/styles'
import Layout from '../../components/layout'
import * as S from '../../components/signupStyles/styles'
import { CommunityRegisterSchema } from '../../schemas/communityRegister'

function CommunitySignup () {
  return (
    <Layout>
      <ThemeProvider theme={{ mode: 'community' }}>
        <S.PageContainer>
          <B.Row>
            <S.BgCol lg="4" >
            </S.BgCol>
            <B.Col lg="8" >
              <S.ContentWrapper>
                <S.H3>Preencha seus dados</S.H3>
                <S.P>Comece a preencher o cadastro de sua comunidade em nossa plataforma indicando seus dados de registro.</S.P>
                <Formik
                  initialValues={{
                    name: '',
                    cnpj: '',
                    email: '',
                    emailConfirmation: '',
                    password: '',
                    passwordConfirmation: '',
                    address: {
                      street: '',
                      complement: '',
                      number: '',
                      neighborhood: '',
                      city: '',
                      state: '',
                      country: '',
                      zipCode: ''
                    }
                  }}
                  validationSchema={CommunityRegisterSchema}
                  onSubmit={values => {
                    // same shape as initial values
                    console.log(values)
                  }}
                >
                  {({ errors, touched }) => (
                    <S.CustomForm>
                      <S.Label>
                        <legend>Nome da instituição</legend>
                        <S.CustomField name="name" placeholder="Insira o nome aqui" />
                        {errors.name && touched.name ? <S.Error>{errors.name}</S.Error> : null}
                      </S.Label>
                      <S.Label width="67%">
                        <legend>CNPJ</legend>
                        <S.CustomField name="cnpj" placeholder="Insira o nome aqui" />
                        {errors.cnpj && touched.cnpj ? <S.Error>{errors.cnpj}</S.Error> : null}
                      </S.Label>
                      <S.Label width="33%">
                        <legend>País</legend>
                        <S.CustomField name="address.country" placeholder="Insira o nome aqui" />
                        {errors.country && touched.country ? <S.Error>{errors.country}</S.Error> : null}
                      </S.Label>
                      <S.Label width="33%">
                        <legend>CEP</legend>
                        <S.CustomField name="address.zipCode" placeholder="Insira o nome aqui" />
                        {errors.zipCode && touched.zipCode ? <S.Error>{errors.zipCode}</S.Error> : null}
                      </S.Label>
                      <S.Label width="33%">
                        <legend>Estado</legend>
                        <S.CustomField name="address.state" placeholder="Insira o nome aqui" />
                        {errors.state && touched.state ? <S.Error>{errors.state}</S.Error> : null}
                      </S.Label>
                      <S.Label width="33%">
                        <legend>Cidade</legend>
                        <S.CustomField name="address.city" placeholder="Insira o nome aqui" />
                        {errors.city && touched.city ? <S.Error>{errors.city}</S.Error> : null}
                      </S.Label>
                      <S.Label width="85%">
                        <legend>Logradouro</legend>
                        <S.CustomField name="address.street" placeholder="Insira o nome aqui" />
                        {errors.street && touched.street ? <S.Error>{errors.street}</S.Error> : null}
                      </S.Label>
                      <S.Label width="15%">
                        <legend>Número</legend>
                        <S.CustomField name="address.number" placeholder="Insira o nome aqui" />
                        {errors.number && touched.complement ? <S.Error>{errors.complement}</S.Error> : null}
                      </S.Label>
                      <S.Label width="65%">
                        <legend>Complemento</legend>
                        <S.CustomField name="address.complement" placeholder="Insira o nome aqui" />
                        {errors.complement && touched.complement ? <S.Error>{errors.complement}</S.Error> : null}
                      </S.Label>
                      <S.Label width="35%">
                        <legend>Bairro</legend>
                        <S.CustomField name="address.neighborhood" placeholder="Insira o nome aqui" />
                        {errors.neighborhood && touched.neighborhood ? <S.Error>{errors.neighborhood}</S.Error> : null}
                      </S.Label>
                      <S.Label width="50%">
                        <legend>E-mail</legend>
                        <S.CustomField name="email" type="email" placeholder="Insira seu e-mail" />
                        {errors.email && touched.email ? <S.Error>{errors.email}</S.Error> : null}
                      </S.Label>
                      <S.Label width="50%">
                        <legend>Confirme seu e-mail</legend>
                        <S.CustomField name="emailConfirmation" type="email" placeholder="Insira seu e-mail" />
                        {errors.emailConfirmation && touched.emailConfirmation ? <S.Error>{errors.emailConfirmation}</S.Error> : null}
                      </S.Label>
                      <S.Label width="50%">
                        <legend>Senha</legend>
                        <S.CustomField name="password" placeholder="Insira sua senha" type="password" />
                        {errors.password && touched.password ? (
                          <S.Error>{errors.password}</S.Error>
                        ) : null}
                      </S.Label>
                      <S.Label width="50%">
                        <legend>Cofirme sua senha</legend>
                        <S.CustomField name="passwordConfirmation" placeholder="Insira sua senha" type="password" />
                        {errors.passwordConfirmation && touched.passwordConfirmation ? (
                          <S.Error>{errors.passwordConfirmation}</S.Error>
                        ) : null}
                      </S.Label>
                      <S.ButtonsWrapper>
                        <E.CustomButton color="danger">Voltar</E.CustomButton>
                        <E.CustomButton type="submit" color="info">Continuar</E.CustomButton>
                      </S.ButtonsWrapper>
                    </S.CustomForm>
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

export default CommunitySignup
