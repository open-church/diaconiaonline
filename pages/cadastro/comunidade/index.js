import React, { useEffect, useState } from 'react'

import * as B from '@bootstrap-styled/v4'
import { Formik } from 'formik'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import Alert from '../../../components/alert'
import * as E from '../../../components/elements/styles'
import Layout from '../../../components/layout'
import * as S from '../../../components/signupStyles/styles'
import TermsOfUse from '../../../components/termsOfUse'
import { saveCredentials } from '../../../helpers/auth'
import { cnpjMask, zipCodeMask } from '../../../helpers/mask'
import { CommunityRegisterSchema } from '../../../schemas/communityRegister'
import Api from '../../../services/api'

function CommunitySignup (props) {
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1)
  const [modal, setModal] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState({ show: false, message: '' })

  useEffect(() => {
    const { credentials } = props
    if (credentials && credentials.entity) {
      credentials.entity === 'people' && Router.push('/atualizar/pessoa')
      credentials.entity === 'community' && Router.push('/atualizar/comunidade')
    } else {
      setLoading(false)
    }
  }, [])

  const onSubmit = async (values) => {
    try {
      setLoading(true)
      const { data } = await Api.createCommunity(values)
      if (!data.community) throw new Error(data.message)
      await saveCredentials({
        token: data.community.token,
        email: data.community.email,
        entity: 'community'
      })
      Router.push('/cadastro/comunidade/sucesso')
    } catch (err) {
      setStep(1)
      window.scrollTo(0, 0)
      setFeedbackMessage({ show: true, message: err.message })
      console.log('err', err.message)
      setLoading(false)
    }
  }

  const getAddress = async (values) => {
    try {
      const { data } = await Api.getAddressByZipCode(values.address.zipCode)
      return data
    } catch (err) {
      setFeedbackMessage({ show: true, message: err.message })
      console.log('err', err)
      return null
    }
  }

  const handleModal = () => {
    setModal(!modal)
  }

  return (
    <Layout loading={loading} navLight>
      <ThemeProvider theme={{ mode: 'community' }}>
        <S.PageContainer>
          <B.Row>
            <S.BgCol lg="4" >
            </S.BgCol>
            <B.Col lg="8" >
              <S.ContentWrapper>
                <S.H3>Preencha seus dados</S.H3>
                <S.P>Comece a preencher o cadastro de sua comunidade em nossa plataforma indicando seus dados de registro.</S.P>
                {feedbackMessage.show && <Alert message={feedbackMessage.message} type="error" />}
                <Formik
                  initialValues={{
                    name: '',
                    accept: false,
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
                    },
                    stock: {
                      money: '',
                      basicBaskets: '',
                      hygieneProducts: '',
                      ppe: ''
                    },
                    financialDetails: {
                      accountName: '',
                      bank: '',
                      agency: '',
                      account: '',
                      doc: ''
                    }
                  }}
                  validationSchema={CommunityRegisterSchema}
                  onSubmit={onSubmit}
                >
                  {({ errors, touched, setFieldValue, values }) => (
                    <>
                      <S.CustomForm hide={step !== 1}>
                        <S.Label>
                          <legend>Nome da instituição*</legend>
                          <S.CustomField name="name" placeholder="Insira o nome aqui" />
                          {errors.name && touched.name ? <S.Error>{errors.name}</S.Error> : null}
                        </S.Label>
                        <S.Label width="67%">
                          <legend>CNPJ</legend>
                          <S.CustomField name="cnpj" render={({ field }) => (
                            <S.MaskField
                              {...field}
                              placeholder="Insira o CNPJ aqui"
                              mask={cnpjMask}
                              id="cnpj"
                              type="text"
                            />
                          )} />
                          {errors.cnpj && touched.cnpj ? <S.Error>{errors.cnpj}</S.Error> : null}
                        </S.Label>
                        <S.Label width="33%">
                          <legend>CEP</legend>
                          <S.CustomField name="address.zipCode" render={({ field }) => (
                            <S.MaskField
                              {...field}
                              placeholder="Insira o CEP aqui"
                              mask={zipCodeMask}
                              id="cpf"
                              type="text"
                              onBlur={async (e) => {
                                const address = await getAddress(values)
                                setFieldValue('address.country', address && address.state ? 'BR' : '')
                                setFieldValue('address.state', address.state || '')
                                setFieldValue('address.city', address.city || '')
                                setFieldValue('address.street', address.street || '')
                                setFieldValue('address.neighborhood', address.neighborhood || '')
                              }}
                            />
                          )}
                          />
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
                          <S.CustomField name="address.number" type="number" placeholder="Insira o número aqui" />
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
                          <E.CustomButton type="button" onClick={() => setStep(2)} disabled={Object.values(errors).length > 0} color="primary">Continuar</E.CustomButton>
                        </S.ButtonsWrapper>
                      </S.CustomForm>
                      <S.CustomForm hide={step !== 2}>
                        <S.Label width="50%">
                          <legend>Dinheiro para ajuda</legend>
                          <S.CustomField name="stock.money" placeholder="Insira o nome aqui" />
                          {errors.money && touched.money ? <S.Error>{errors.money}</S.Error> : null}
                        </S.Label>
                        <S.Label width="50%">
                          <legend>Cestas básicas disponíveis</legend>
                          <S.CustomField name="stock.basicBaskets" placeholder="Insira o nome aqui" />
                          {errors.basicBaskets && touched.basicBaskets ? <S.Error>{errors.basicBaskets}</S.Error> : null}
                        </S.Label>
                        <S.Label width="50%">
                          <legend>Kits de higiene disponíveis</legend>
                          <S.CustomField name="stock.hygieneProducts" placeholder="Insira o nome aqui" />
                          {errors.hygieneProducts && touched.hygieneProducts ? <S.Error>{errors.hygieneProducts}</S.Error> : null}
                        </S.Label>
                        <S.Label width="50%">
                          <legend>EPIs disponíveis</legend>
                          <S.CustomField name="stock.ppe" placeholder="Insira o nome aqui" />
                          {errors.ppe && touched.ppe ? <S.Error>{errors.ppe}</S.Error> : null}
                        </S.Label>
                        <S.H4>Dados bancários da instituição</S.H4>
                        <S.Label width="50%">
                          <legend>Agência</legend>
                          <S.CustomField name="financialDetails.agency" placeholder="Insira o nome aqui" />
                          {errors.agency && touched.agency ? <S.Error>{errors.agency}</S.Error> : null}
                        </S.Label>
                        <S.Label width="50%">
                          <legend>Conta</legend>
                          <S.CustomField name="financialDetails.account" placeholder="Insira o nome aqui" />
                          {errors.account && touched.account ? <S.Error>{errors.account}</S.Error> : null}
                        </S.Label>
                        <S.Label width="50%">
                          <legend>Banco</legend>
                          <S.CustomField name="financialDetails.bank" placeholder="Insira o nome aqui" />
                          {errors.bank && touched.bank ? <S.Error>{errors.bank}</S.Error> : null}
                        </S.Label>
                        <S.Label width="50%">
                          <legend>CNPJ</legend>
                          <S.CustomField name="financialDetails.doc" placeholder="Insira o nome aqui" />
                          {errors.doc && touched.doc ? <S.Error>{errors.doc}</S.Error> : null}
                        </S.Label>
                        <S.Label width="100%">
                          <legend>Titular</legend>
                          <S.CustomField name="financialDetails.accountName" placeholder="Insira o nome aqui" />
                          {errors.accountName && touched.accountName ? <S.Error>{errors.accountName}</S.Error> : null}
                        </S.Label>
                        <S.CheckBoxLabel>
                          <S.CustomCheckbox name="accept" checked={values.accept} onChange={() => setFieldValue('accept', !values.accept)}/>
                          <S.Checkmark></S.Checkmark>
                        Li e aceito os <S.TermsLink onClick={handleModal}>Termos de Uso</S.TermsLink>
                        </S.CheckBoxLabel>
                        <S.ButtonsWrapper>
                          <E.CustomButton type="button" onClick={() => setStep(1)} color="secondary">Voltar</E.CustomButton>
                          <E.CustomButton type="submit" color="primary">Cadastrar</E.CustomButton>
                        </S.ButtonsWrapper>
                      </S.CustomForm>
                    </>
                  )}
                </Formik>
              </S.ContentWrapper>
            </B.Col>
          </B.Row>
          <B.Modal isOpen={modal} toggle={handleModal}>
            <B.ModalHeader toggle={handleModal}>Termos de Uso</B.ModalHeader>
            <B.ModalBody>
              <TermsOfUse />
            </B.ModalBody>
          </B.Modal>
        </S.PageContainer>
      </ThemeProvider>
    </Layout>
  )
}

CommunitySignup.propTypes = {
  credentials: PropTypes.object
}

export default CommunitySignup
