import React, { useEffect, useState } from 'react'

import * as B from '@bootstrap-styled/v4'
import { Formik, Form } from 'formik'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import Alert from '../../../components/alert'
import * as E from '../../../components/elements/styles'
import Layout from '../../../components/layout'
import * as S from '../../../components/loginStyles/styles'
import { ForgotPasswordSchema } from '../../../schemas/login'
import Api from '../../../services/api'

function PeopleForgotPassword (props) {
  const [loading, setLoading] = useState(true)
  const [feedbackMessage, setFeedbackMessage] = useState({ show: false, type: 'error', message: '' })

  useEffect(() => {
    const { credentials } = props
    if (credentials && credentials.entity) {
      credentials.entity === 'people' && Router.push('/dashboard/pessoa')
      credentials.entity === 'community' && Router.push('/dashboard/comunidade')
    } else {
      setLoading(false)
    }
  }, [])

  const requestNewPassword = async values => {
    try {
      setLoading(true)
      const response = await Api.forgotPeoplePassword({ ...values })
      if (response.status !== 200) throw new Error(response.data.message)
      setFeedbackMessage({ show: true, type: 'success', message: 'Uma nova senha foi gerada e enviada por e-mail' })
    } catch (err) {
      window.scrollTo(0, 0)
      setFeedbackMessage({ show: true, type: 'error', message: err.message })
      console.log('err', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout loading={loading}>
      <ThemeProvider theme={{ mode: 'user' }}>
        <S.PageContainer fluid>
          <B.Row>
            <S.BgCol lg="5" xl="7">
            </S.BgCol>
            <B.Col lg="7" xl="5">
              <S.ContentWrapper>
                <S.H3>Nova senha</S.H3>
                <S.P>Informe seu e-mail enviaremos uma nova senha para acesso.</S.P>
                {feedbackMessage.show && <Alert message={feedbackMessage.message} type={feedbackMessage.type} />}
                <Formik
                  initialValues={{ email: '' }}
                  validationSchema={ForgotPasswordSchema}
                  onSubmit={requestNewPassword}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <S.Label htmlFor="email">E-mail</S.Label>
                      <S.CustomField name="email" type="email" placeholder="Insira seu e-mail" />
                      {errors.email && touched.email ? <S.Error>{errors.email}</S.Error> : null}
                      <S.ButtonsWrapper>
                        <E.CustomButton width="42%" type="submit" color="primary">Solicitar nova senha</E.CustomButton>
                        <E.CustomButton tag={B.A} href="/login/pessoa" width="54%" color="secondary">Voltar</E.CustomButton>
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

PeopleForgotPassword.propTypes = {
  credentials: PropTypes.object
}

export default PeopleForgotPassword
