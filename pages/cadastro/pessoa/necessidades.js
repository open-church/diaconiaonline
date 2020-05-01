import React, { useEffect, useState } from 'react'

import * as B from '@bootstrap-styled/v4'
import { Formik } from 'formik'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import * as E from '../../../components/elements/styles'
import Layout from '../../../components/layout'
import * as S from '../../../components/signupStyles/styles'
import TermsOfUse from '../../../components/termsOfUse'
import { CommunityStockSchema } from '../../../schemas/userNeeds'
import Api from '../../../services/api'

function UserResources (props) {
  const [accept, setAccpet] = useState(false)
  const [relations, setRelations] = useState([])
  const [occupations, setOccupations] = useState([])
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [people, setPeople] = useState(null)

  useEffect(() => {
    const { credentials } = props
    const getPeople = async () => {
      const people = await Api.getPeople()
      const occupations = await Api.getOccupations()
      const relations = await Api.getCommunityRelations()
      setPeople(people.data)
      setOccupations(occupations.data)
      setRelations(relations.data)
      setLoading(false)
    }
    credentials && credentials.entity === 'people' ? getPeople() : setLoading(false)
  }, [])

  const updatePeople = async (values) => {
    try {
      setLoading(true)
      const { data } = await Api.updatePeople({ ...values, accept })
      // TODO data.message
      setPeople(data.people)
      setTimeout(() => {
        Router.push('/cadastro/pessoa/sucesso')
      }, 5000)
    } catch (err) {
      // TODO err.message
      console.log('err', err)
      setLoading(false)
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
                <S.H3>Diga-nos suas necessidades</S.H3>
                <S.P>Informe qual é a sua comunidade, sua relação dentro dela e suas necessidades nesse momento.</S.P>
                <Formik
                  initialValues={{
                    occupation: people ? people.occupation : '',
                    communityRelation: people ? people.communityRelation : '',
                    urgencies: people ? people.urgencies : '',
                    specialNeeds: {
                      value: people && people.specialNeeds ? people.specialNeeds.value : '',
                      description: people && people.specialNeeds ? people.specialNeeds.description : ''
                    },
                    controlledMedication: {
                      value: people && people.controlledMedication ? people.controlledMedication.value : '',
                      description: people && people.controlledMedication ? people.controlledMedication.description : ''
                    }
                  }}
                  validationSchema={CommunityStockSchema}
                  onSubmit={updatePeople}
                >
                  {({ errors, touched, setFieldValue, values }) => (
                    <S.CustomForm>
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
                          <label><input type="radio" name="specialNeeds.value" onChange={() => setFieldValue('specialNeeds.value', true)}/> Sim</label>
                          <label><input type="radio" name="specialNeeds.value" onChange={() => setFieldValue('specialNeeds.value', false)}/> Não</label>
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
                          <label><input type="radio" name="controlledMedication.value" onChange={() => setFieldValue('controlledMedication.value', true)}/> Sim</label>
                          <label><input type="radio" name="controlledMedication.value" onChange={() => setFieldValue('controlledMedication.value', false)}/> Não</label>
                        </div>
                      </S.CustomFieldSet>
                      <S.Label width="60%">
                        <legend>Diga-nos o nome da medicação:</legend>
                        <S.CustomField disabled={!values.controlledMedication.value} name="controlledMedication.description" placeholder="Escreva aqui" />
                        {errors.description && touched.description ? <S.Error>{errors.description}</S.Error> : null}
                      </S.Label>
                      <S.CheckBoxLabel>
                        <S.CustomCheckbox checked={accept} onChange={() => setAccpet(!accept)}/>
                        <S.Checkmark></S.Checkmark>
                        Li e aceito os <S.TermsLink onClick={() => handleModal()}>Termos de Uso</S.TermsLink>
                      </S.CheckBoxLabel>
                      <S.ButtonsWrapper>
                        <E.CustomButton tag={B.A} href="/cadastro/pessoa/index" color="secondary">Voltar</E.CustomButton>
                        <E.CustomButton type="submit" color="primary">Cadastrar</E.CustomButton>
                      </S.ButtonsWrapper>
                    </S.CustomForm>
                  )}
                </Formik>
              </S.ContentWrapper>
            </B.Col>
          </B.Row>
          <B.Modal isOpen={modal} toggle={() => handleModal()}>
            <B.ModalHeader toggle={() => handleModal()}>Termos de Uso</B.ModalHeader>
            <B.ModalBody>
              <TermsOfUse />
            </B.ModalBody>
          </B.Modal>
        </S.PageContainer>
      </ThemeProvider>
    </Layout>
  )
}

UserResources.propTypes = {
  credentials: PropTypes.object
}

export default UserResources
