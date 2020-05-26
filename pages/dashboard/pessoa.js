import React, { useEffect, useState } from 'react'

import * as B from '@bootstrap-styled/v4'
import Router from 'next/router'
import PropTypes from 'prop-types'

import * as S from '../../components/dashboard/styles'
import Layout from '../../components/layout'
import { getOccupation } from '../../helpers/formatData'
import Api from '../../services/api'

function UserDashboard ({ credentials }) {
  const [loading, setLoading] = useState(true)
  const [people, setPeople] = useState({})

  useEffect(() => {
    const getPeople = async () => {
      const { data } = await Api.getPeople()
      setPeople(data)
      setLoading(false)
    }
    if (!credentials || !credentials.entity) return Router.push('/login/pessoa')
    credentials.entity === 'people' && getPeople()
    credentials.entity === 'community' && Router.push('/dashboard/comunidade')
  }, [])

  const check = (field) => field && field.length > 0

  const getAddress = (address) => {
    const street = check(address.street) ? `${address.street}, ` : ''
    const number = check(address.number) ? `${address.number}, ` : ''
    const complement = check(address.complement) ? `${address.complement}, ` : ''
    const neighborhood = check(address.neighborhood) ? `${address.neighborhood}, ` : ''
    const city = check(address.city) ? `${address.city} - ` : ''
    const state = check(address.state) ? `${address.state}, ` : ''
    const zipCode = check(address.zipCode) ? `${address.zipCode}` : ''
    return `${street}${number}${complement}${neighborhood}${city}${state}${zipCode}`
  }

  return (
    <Layout loading={loading} credentials={credentials}>
      <S.Wrapper>
        <S.TopContainer fluid/>
        <S.CustomContainer>
          <B.Row>
            <B.Col>
              <S.H1>Olá!</S.H1>
              <S.P>Este é o painel de visualização de seu cadastro. Nele você pode atualizar seus dados sempre que necessário e informar sua comunidade sobre sua situação.</S.P>
            </B.Col>
          </B.Row>
        </S.CustomContainer>
        <S.UserBox>
          <B.Row>
            <B.Col>
              <S.H2>{people.name}</S.H2>
              <S.KeyValues>{people.email}{people.occupation && ` - ${getOccupation(people.occupation)}`}</S.KeyValues>
              <S.InfoWrapper>
                <S.InfoBox>
                  <S.KeyValues bold specialFloat>{people.phone}</S.KeyValues>
                  <S.SpecialWrapper>
                    <S.KeyValues icon="star">{people.specialNeeds && people.specialNeeds.value ? people.specialNeeds.description : 'Não informado'}</S.KeyValues>
                    <S.KeyValues icon="pill">{people.controlledMedication && people.controlledMedication.value ? people.controlledMedication.description : 'Não informado'}</S.KeyValues>
                  </S.SpecialWrapper>
                </S.InfoBox>
                <S.InfoBox>
                  <S.KeyValues bold>Uso de medicamentos</S.KeyValues>
                  <S.Values>{people.controlledMedication && people.controlledMedication.value ? people.controlledMedication.description : 'Não informado'}</S.Values>
                </S.InfoBox>
                <S.InfoBox>
                  <S.KeyValues bold>Urgência</S.KeyValues>
                  <S.Values>{people.urgencies || 'Não informada'}</S.Values>
                </S.InfoBox>
                <S.InfoBox>
                  <S.KeyValues bold>Endereço</S.KeyValues>
                  <S.Values>{people.address && people.address.zipCode.length > 0 ? getAddress(people.address) : 'Não informado'}</S.Values>
                </S.InfoBox>
              </S.InfoWrapper>
            </B.Col>
          </B.Row>
        </S.UserBox>
      </S.Wrapper>
    </Layout>
  )
}

UserDashboard.propTypes = {
  credentials: PropTypes.object
}

export default UserDashboard
