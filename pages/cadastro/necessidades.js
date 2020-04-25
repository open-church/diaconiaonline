import React, { useState } from 'react'

import * as B from '@bootstrap-styled/v4'
import { Formik } from 'formik'
import { ThemeProvider } from 'styled-components'

import * as E from '../../components/elements/styles'
import Layout from '../../components/layout'
import * as S from '../../components/signupStyles/styles'
import TermsOfUse from '../../components/termsOfUse'
import { CommunityStockSchema, RELATIONS, OCCUPATIONS, ESPECIALNEEDS } from '../../schemas/userNeeds'

function UserResources () {
  const [accept, setAccpet] = useState(false)
  const [modal, setModal] = useState(false)

  const handleModal = () => {
    setModal(!modal)
  }

  return (
    <Layout>
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
                  validationSchema={CommunityStockSchema}
                  onSubmit={values => {
                    // same shape as initial values
                    console.log(values)
                  }}
                >
                  {({ errors, touched, setFieldValue, values }) => (
                    <S.CustomForm>
                      <S.Label width="50%">
                        <legend>Posição na comunidade</legend>
                        <S.CustomSelect
                          name="communityRelation"
                          placeholder="Selecione..."
                          classNamePrefix="react-select"
                          options={RELATIONS}
                          value={RELATIONS.find(option => option.value === values.communityRelation)}
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
                          options={OCCUPATIONS}
                          value={OCCUPATIONS.find(option => option.value === values.occupation)}
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
                        <S.CustomSelect
                          name="specialNeeds.description"
                          placeholder="Selecione..."
                          classNamePrefix="react-select"
                          isDisabled={!values.specialNeeds.value}
                          options={ESPECIALNEEDS}
                          value={ESPECIALNEEDS.find(option => option.value === values.specialNeeds.description)}
                          onChange={(e, data) => setFieldValue(data.name, e.value)}
                        />
                        {errors.occupation && touched.occupation ? <S.Error>{errors.occupation}</S.Error> : null}
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
                        <E.CustomButton color="secondary">Voltar</E.CustomButton>
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

export default UserResources
