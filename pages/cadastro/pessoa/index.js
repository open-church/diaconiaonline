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
import { cpfMask, zipCodeMask } from '../../../helpers/mask'
import { UserRegisterSchema } from '../../../schemas/userRegister'
import Api from '../../../services/api'

function UserSignup (props) {
  const [relations, setRelations] = useState([])
  const [occupations, setOccupations] = useState([])
  const [loading, setLoading] = useState(true)
  const [feedbackMessage, setFeedbackMessage] = useState({ show: false, message: '' })
  const [modal, setModal] = useState(false)
  const [step, setStep] = useState(1)
  const [communityCode, setCommunityCode] = useState('')

  useEffect(() => {
    const { credentials, query: { code } } = props
    setCommunityCode(code || '')
    console.log('code', code)

    const getList = async () => {
      const occupations = await Api.getOccupations()
      const relations = await Api.getCommunityRelations()
      setOccupations(occupations.data)
      setRelations(relations.data)
    }
    if (credentials && credentials.entity) {
      credentials.entity === 'people' && Router.push('/atualizar/pessoa')
      credentials.entity === 'community' && Router.push('/atualizar/comunidade')
    } else {
      setLoading(false)
      getList()
    }
  }, [])

  const onSubmit = async (values) => {
    try {
      setLoading(true)
      const { data } = await Api.createPeople(values)
      if (!data.people) throw new Error(data.message)
      await saveCredentials({
        token: data.people.token,
        email: data.people.email,
        entity: 'people'
      })
      Router.push('/cadastro/pessoa/sucesso')
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
                {feedbackMessage.show && <Alert message={feedbackMessage.message} type="error" />}
                <Formik
                  initialValues={{
                    name: '',
                    communityCode,
                    cpf: '',
                    email: '',
                    emailConfirmation: '',
                    accept: false,
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
                    occupation: '',
                    communityRelation: '',
                    urgencies: '',
                    specialNeeds: {
                      value: false,
                      description: ''
                    },
                    controlledMedication: {
                      value: false,
                      description: ''
                    }
                  }}
                  validationSchema={UserRegisterSchema}
                  onSubmit={onSubmit}
                >
                  {({ errors, touched, values, setFieldValue, setErrors, handleChange }) => (
                    <>
                      <S.CustomForm hide={step !== 1}>
                        <S.Label>
                          <legend>Nome*</legend>
                          <S.CustomField name="name" placeholder="Insira o nome aqui" />
                          {errors.name && touched.name ? <S.Error>{errors.name}</S.Error> : null}
                        </S.Label>
                        <S.Label width="33%">
                          <legend>Código da Comunidade*</legend>
                          <S.CustomField onChange={handleChange} value={values.communityCode} name="communityCode" placeholder="Insira o código da sua comunidade" />
                          {errors.communityCode && touched.communityCode ? <S.Error>{errors.communityCode}</S.Error> : null}
                        </S.Label>
                        <S.Label width="33%">
                          <legend>CPF</legend>
                          <S.CustomField
                            name="cpf"
                            render={({ field }) => (
                              <S.MaskField
                                {...field}
                                placeholder="Insira o CPF aqui"
                                mask={cpfMask}
                                id="cpf"
                                type="text"
                              />
                            )}
                          />
                          {errors.cpf && touched.cpf ? <S.Error>{errors.cpf}</S.Error> : null}
                        </S.Label>
                        <S.Label width="33%">
                          <legend>CEP</legend>
                          <S.CustomField
                            name="address.zipCode"
                            render={({ field }) => (
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
                          <S.CustomField name="address.number" type="number" placeholder="Insira o número aqui" />
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
                          <E.CustomButton type="button" onClick={() => setStep(2)} disabled={Object.values(errors).length > 0} color="primary">Continuar</E.CustomButton>
                        </S.ButtonsWrapper>
                      </S.CustomForm>
                      <S.CustomForm hide={step !== 2}>
                        <S.Label width="50%">
                          <legend>Posição na comunidade</legend>
                          <S.CustomSelect
                            name="communityRelation"
                            placeholder="Selecione..."
                            classNamePrefix="react-select"
                            options={relations}
                            value={relations.find(option => option.value === values.communityRelation)}
                            onChange={(e, data) => setFieldValue(data.name, e.value)}
                          />
                          {errors.communityRelation && touched.communityRelation ? <S.Error>{errors.communityRelation}</S.Error> : null}
                        </S.Label>
                        <S.Label width="50%">
                          <legend>Ocupação atual</legend>
                          <S.CustomSelect
                            name="occupation"
                            placeholder="Selecione..."
                            classNamePrefix="react-select"
                            options={occupations}
                            value={occupations.find(option => option.value === values.occupation)}
                            onChange={(e, data) => setFieldValue(data.name, e.value)}
                          />
                          {errors.occupation && touched.occupation ? <S.Error>{errors.occupation}</S.Error> : null}
                        </S.Label>
                        <S.Label>
                          <legend>Nos diga se você tem urgência em algum mantimento:</legend>
                          <S.CustomField name="urgencies" placeholder="Escreva aqui" />
                          {errors.urgencies && touched.urgencies ? <S.Error>{errors.urgencies}</S.Error> : null}
                        </S.Label>
                        <S.CustomFieldSet width="40%">
                          <legend>Portador de necessidades especiais?</legend>
                          <div>
                            <label><input type="radio" value="true" checked={values.specialNeeds.value} name="specialNeeds.value" onChange={() => setFieldValue('specialNeeds.value', true)}/> Sim</label>
                            <label><input type="radio" value="false" checked={!values.specialNeeds.value} name="specialNeeds.value" onChange={() => {
                              setFieldValue('specialNeeds.value', false)
                              setFieldValue('specialNeeds.description', '')
                            }}/> Não</label>
                          </div>
                        </S.CustomFieldSet>
                        <S.Label width="60%">
                          <legend>Qual sua necessidade especial?</legend>
                          <S.CustomField disabled={!values.specialNeeds.value} name="specialNeeds.description" placeholder="Escreva aqui" />
                          {errors.specialNeeds && touched.specialNeeds ? <S.Error>{errors.specialNeeds}</S.Error> : null}
                        </S.Label>
                        <S.CustomFieldSet width="40%">
                          <legend>Utiliza medicação controlada?</legend>
                          <div>
                            <label><input type="radio" value="true" checked={values.controlledMedication.value} name="controlledMedication.value" onChange={() => setFieldValue('controlledMedication.value', true)}/> Sim</label>
                            <label><input type="radio" value="true" checked={!values.controlledMedication.value} name="controlledMedication.value" onChange={() => {
                              setFieldValue('controlledMedication.value', false)
                              setFieldValue('controlledMedication.description', '')
                            }}/> Não</label>
                          </div>
                        </S.CustomFieldSet>
                        <S.Label width="60%">
                          <legend>Diga-nos o nome da medicação:</legend>
                          <S.CustomField disabled={!values.controlledMedication.value} name="controlledMedication.description" placeholder="Escreva aqui" />
                          {errors.description && touched.description ? <S.Error>{errors.description}</S.Error> : null}
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

UserSignup.propTypes = {
  credentials: PropTypes.object,
  query: PropTypes.object
}

export default UserSignup
