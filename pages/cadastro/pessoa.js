import React, { useEffect, useState } from 'react'

import * as B from '@bootstrap-styled/v4'
import { Formik } from 'formik'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import * as E from '../../components/elements/styles'
import Layout from '../../components/layout'
import * as S from '../../components/signupStyles/styles'
import { UserRegisterSchema } from '../../schemas/userRegister'
import Api from '../../services/api'

function UserSignup (props) {
  const [loading, setLoading] = useState(true)
  const [people, setPeople] = useState(null)

  useEffect(() => {
    const { credentials } = props
    const getPeople = async () => {
      const { data } = await Api.getPeople()
      setPeople(data)
      setLoading(false)
    }
    credentials && credentials.entity === 'people' ? getPeople() : setLoading(false)
  }, [])

  const updatePeople = async (values) => {
    try {
      setLoading(true)
      const { data } = await (people ? Api.updatePeople(values) : Api.createPeople(values))
      // TODO data.message
      setPeople(data.people)
      setTimeout(() => {
        Router.push('/login/pessoa')
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
      <ThemeProvider theme={{ mode: 'user' }}>
        <S.PageContainer>
          <B.Row>
            <S.BgCol lg="4" >
            </S.BgCol>
            <B.Col lg="8" >
              <S.ContentWrapper>
                <S.H3>Preencha seus dados</S.H3>
                <S.P>Comece a preencher o seu cadastro em nossa plataforma nos informando os seus dados pessoais para criação da conta.</S.P>
                <Formik
                  initialValues={{
                    name: people ? people.name : '',
                    communityCode: people ? people.communityCode : '',
                    cpf: people ? people.cpf : '',
                    email: people ? people.email : '',
                    emailConfirmation: people ? people.email : '',
                    password: people ? people.password : '',
                    passwordConfirmation: '',
                    address: {
                      street: people && people.address ? people.address.street : '',
                      complement: people && people.address ? people.address.complement : '',
                      number: people && people.address ? people.address.number : '',
                      neighborhood: people && people.address ? people.address.neighborhood : '',
                      city: people && people.address ? people.address.city : '',
                      state: people && people.address ? people.address.state : '',
                      country: people && people.address ? people.address.country : '',
                      zipCode: people && people.address ? people.address.zipCode : ''
                    }
                  }}
                  validationSchema={UserRegisterSchema}
                  onSubmit={updatePeople}
                >
                  {({ errors, touched, values, setFieldValue }) => (
                    <S.CustomForm>
                      <S.Label>
                        <legend>Nome*</legend>
                        <S.CustomField name="name" placeholder="Insira o nome aqui" />
                        {errors.name && touched.name ? <S.Error>{errors.name}</S.Error> : null}
                      </S.Label>
                      <S.Label width="33%">
                        <legend>Código da Comunidade*</legend>
                        <S.CustomField name="communityCode" placeholder="Insira o código da sua comunidade" />
                        {errors.communityCode && touched.communityCode ? <S.Error>{errors.communityCode}</S.Error> : null}
                      </S.Label>
                      <S.Label width="33%">
                        <legend>CPF</legend>
                        <S.CustomField name="cpf" placeholder="Insira o CPF aqui" />
                        {errors.cpf && touched.cpf ? <S.Error>{errors.cpf}</S.Error> : null}
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
                        <S.CustomField name="address.country" placeholder="Preencha CEP" disabled/>
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
                      <S.Label width="35%">
                        <legend>Número</legend>
                        <S.CustomField name="address.number" placeholder="Insira o número aqui" />
                        {errors.number && touched.complement ? <S.Error>{errors.complement}</S.Error> : null}
                      </S.Label>
                      <S.Label width="65%">
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
                        <E.CustomButton tag={B.A} href="/login/pessoa" color="secondary">Voltar</E.CustomButton>
                        <E.CustomButton type="submit" color="primary">Continuar</E.CustomButton>
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

UserSignup.propTypes = {
  credentials: PropTypes.object
}

export default UserSignup
