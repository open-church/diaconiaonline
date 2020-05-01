import React, { useEffect, useState } from 'react'

import * as B from '@bootstrap-styled/v4'
import { Formik } from 'formik'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import * as E from '../../../components/elements/styles'
import Layout from '../../../components/layout'
import * as S from '../../../components/signupStyles/styles'
import { saveCredentials } from '../../../helpers/auth'
import { CommunityRegisterSchema } from '../../../schemas/communityRegister'
import Api from '../../../services/api'

function CommunitySignup (props) {
  const [loading, setLoading] = useState(true)
  const [community, setCommunity] = useState(null)

  useEffect(() => {
    const { credentials } = props
    const getCommunity = async () => {
      const { data } = await Api.getCommunity()
      setCommunity(data)
      setLoading(false)
    }
    credentials && credentials.entity === 'community' ? getCommunity() : setLoading(false)
  }, [])

  const updateCommunity = async (values) => {
    try {
      setLoading(true)
      const { data } = await (community ? Api.updateCommunity(values) : Api.createCommunity(values))
      // TODO data.message
      setCommunity(data.community)
      await saveCredentials({
        token: data.community.token,
        email: data.community.email,
        entity: 'community'
      })
      setTimeout(() => {
        Router.push('/cadastro/comunidade/recursos')
      }, 5000)
    } catch (err) {
      // TODO err.message
      console.log('err', err)
      setLoading(false)
    }
  }

  const getAddress = async (values) => {
    try {
      const { data } = await Api.getAddressByZipCode(values.address.zipCode)
      return data
    } catch (err) {
      // TODO err.message
      console.log('err', err)
      return null
    }
  }

  return (
    <Layout loading={loading}>
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
                    name: community ? community.name : '',
                    cnpj: community ? community.cnpj : '',
                    email: community ? community.email : '',
                    emailConfirmation: community ? community.email : '',
                    password: community ? community.password : '',
                    passwordConfirmation: '',
                    address: {
                      street: community && community.address ? community.address.street : '',
                      complement: community && community.address ? community.address.complement : '',
                      number: community && community.address ? community.address.number : '',
                      neighborhood: community && community.address ? community.address.neighborhood : '',
                      city: community && community.address ? community.address.city : '',
                      state: community && community.address ? community.address.state : '',
                      country: community && community.address ? community.address.country : '',
                      zipCode: community && community.address ? community.address.zipCode : ''
                    }
                  }}
                  validationSchema={CommunityRegisterSchema}
                  onSubmit={updateCommunity}
                >
                  {({ errors, touched, setFieldValue, values }) => (
                    <S.CustomForm>
                      <S.Label>
                        <legend>Nome da instituição*</legend>
                        <S.CustomField name="name" placeholder="Insira o nome aqui" />
                        {errors.name && touched.name ? <S.Error>{errors.name}</S.Error> : null}
                      </S.Label>
                      <S.Label width="67%">
                        <legend>CNPJ</legend>
                        <S.CustomField name="cnpj" placeholder="Insira o CNPJ aqui" />
                        {errors.cnpj && touched.cnpj ? <S.Error>{errors.cnpj}</S.Error> : null}
                      </S.Label>
                      <S.Label width="33%">
                        <legend>CEP</legend>
                        <S.CustomField name="address.zipCode" placeholder="Insira o CEP aqui"
                          onBlur={async (e) => {
                            const address = await getAddress(values)
                            setFieldValue('address.country', address ? 'BR' : '')
                            setFieldValue('address.state', address ? address.state : '')
                            setFieldValue('address.city', address ? address.city : '')
                            setFieldValue('address.street', address ? address.street : '')
                            setFieldValue('address.neighborhood', address ? address.neighborhood : '')
                          }}/>
                        {errors.zipCode && touched.zipCode ? <S.Error>{errors.zipCode}</S.Error> : null}
                      </S.Label>
                      <S.Label width="33%">
                        <legend>País</legend>
                        <S.CustomField name="address.country" placeholder="Preencha CEP" disabled />
                        {errors.country && touched.country ? <S.Error>{errors.country}</S.Error> : null}
                      </S.Label>
                      <S.Label width="33%">
                        <legend>Estado</legend>
                        <S.CustomField name="address.state" placeholder="Preencha CEP" disabled />
                        {errors.state && touched.state ? <S.Error>{errors.state}</S.Error> : null}
                      </S.Label>
                      <S.Label width="33%">
                        <legend>Cidade</legend>
                        <S.CustomField name="address.city" placeholder="Preencha CEP" disabled />
                        {errors.city && touched.city ? <S.Error>{errors.city}</S.Error> : null}
                      </S.Label>
                      <S.Label width="67%">
                        <legend>Logradouro</legend>
                        <S.CustomField name="address.street" placeholder="Preencha CEP" disabled />
                        {errors.street && touched.street ? <S.Error>{errors.street}</S.Error> : null}
                      </S.Label>
                      <S.Label width="33%">
                        <legend>Bairro</legend>
                        <S.CustomField name="address.neighborhood" placeholder="Preencha CEP" disabled />
                        {errors.neighborhood && touched.neighborhood ? <S.Error>{errors.neighborhood}</S.Error> : null}
                      </S.Label>
                      <S.Label width="15%">
                        <legend>Número</legend>
                        <S.CustomField name="address.number" placeholder="Insira o número aqui" />
                        {errors.number && touched.complement ? <S.Error>{errors.complement}</S.Error> : null}
                      </S.Label>
                      <S.Label width="85%">
                        <legend>Complemento</legend>
                        <S.CustomField name="address.complement" placeholder="Insira o complemento aqui" />
                        {errors.complement && touched.complement ? <S.Error>{errors.complement}</S.Error> : null}
                      </S.Label>
                      <S.Label width="50%">
                        <legend>E-mail*</legend>
                        <S.CustomField name="email" type="email" placeholder="Insira seu e-mail" />
                        {errors.email && touched.email ? <S.Error>{errors.email}</S.Error> : null}
                      </S.Label>
                      <S.Label width="50%">
                        <legend>Confirme seu e-mail*</legend>
                        <S.CustomField name="emailConfirmation" type="email" placeholder="Insira seu e-mail" />
                        {errors.emailConfirmation && touched.emailConfirmation ? <S.Error>{errors.emailConfirmation}</S.Error> : null}
                      </S.Label>
                      <S.Label width="50%">
                        <legend>Senha*</legend>
                        <S.CustomField name="password" placeholder="Insira sua senha" type="password" />
                        {errors.password && touched.password ? (
                          <S.Error>{errors.password}</S.Error>
                        ) : null}
                      </S.Label>
                      <S.Label width="50%">
                        <legend>Cofirme sua senha*</legend>
                        <S.CustomField name="passwordConfirmation" placeholder="Insira sua senha" type="password" />
                        {errors.passwordConfirmation && touched.passwordConfirmation ? (
                          <S.Error>{errors.passwordConfirmation}</S.Error>
                        ) : null}
                      </S.Label>
                      <S.ButtonsWrapper>
                        <E.CustomButton tag={B.A} href="/login/comunidade" color="danger">Voltar</E.CustomButton>
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

CommunitySignup.propTypes = {
  credentials: PropTypes.object
}

export default CommunitySignup
