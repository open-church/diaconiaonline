import React, { useState } from 'react'

import * as B from '@bootstrap-styled/v4'
import { Formik } from 'formik'
import { ThemeProvider } from 'styled-components'

import * as E from '../../components/elements/styles'
import Layout from '../../components/layout'
import * as S from '../../components/signupStyles/styles'
import TermsOfUse from '../../components/termsOfUse'
import { CommunityStockSchema } from '../../schemas/communityStock'

function CommunityStocks () {
  const [accept, setAccpet] = useState(false)
  const [modal, setModal] = useState(false)

  const handleModal = () => {
    setModal(!modal)
  }

  return (
    <Layout>
      <ThemeProvider theme={{ mode: 'community' }}>
        <S.PageContainer>
          <B.Row>
            <S.BgCol lg="4" >
            </S.BgCol>
            <B.Col lg="8" >
              <S.ContentWrapper>
                <S.H3>Descreva seus Recursos</S.H3>
                <S.P>Indique nos campos indicados os recursos disponíveis para ajuda em sua comunidade. Lembre-se de sempre atualizá-los na plataforma.</S.P>
                <Formik
                  initialValues={{
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
                  validationSchema={CommunityStockSchema}
                  onSubmit={values => {
                    // same shape as initial values
                    console.log(values)
                  }}
                >
                  {({ errors, touched }) => (
                    <S.CustomForm>
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
                        <S.CustomCheckbox checked={accept} onChange={() => setAccpet(!accept)}/>
                        <S.Checkmark></S.Checkmark>
                        Li e aceito os <S.TermsLink onClick={() => handleModal()}>Termos de Uso</S.TermsLink>
                      </S.CheckBoxLabel>
                      <S.ButtonsWrapper>
                        <E.CustomButton color="danger">Voltar</E.CustomButton>
                        <E.CustomButton type="submit" color="info">Cadastrar</E.CustomButton>
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

export default CommunityStocks
