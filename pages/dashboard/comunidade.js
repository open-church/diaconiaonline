import React, { useEffect, useState } from 'react'

import * as B from '@bootstrap-styled/v4'
import Router from 'next/router'
import PropTypes from 'prop-types'

import * as S from '../../components/dashboard/styles'
import Layout from '../../components/layout'
import Api from '../../services/api'

const selectOptions = [
  { value: 'ununployed', label: 'Desempregado' },
  { value: 'specialNeeds', label: 'PcD' },
  { value: 'urgency', label: 'Urgências' },
  { value: 'controlledMedication', label: 'Necessidade de medicamentos' }
]

function CommunityDashboard (props) {
  const [loading, setLoading] = useState(true)
  const [community, setCommunity] = useState({})
  const [members, setMembers] = useState([])

  useEffect(() => {
    const { credentials } = props
    const getCommunity = async () => {
      const communityResponse = await Api.getCommunity()
      const membersResponse = await Api.getMyMembers()
      setCommunity(communityResponse.data)
      setMembers(membersResponse.data)
      setLoading(false)
    }
    if (!credentials || !credentials.entity) return Router.push('/login/comunidade')
    credentials.entity === 'people' && Router.push('/dashboard/people')
    credentials.entity === 'community' && getCommunity()
  }, [])

  const numberWithDot = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  return (
    <Layout loading={loading}>
      <S.Wrapper>
        <S.TopContainer fluid community={true}/>
        <S.CustomContainer>
          <B.Row>
            <B.Col>
              <S.H1>Olá, comunidade!</S.H1>
              <S.P>Este é o seu painel de gerenciamento.<br/>
              Veja quanto sua comunidade tem em caixa, os itens disponíveis para doação e os membros cadastrados.</S.P>
            </B.Col>
          </B.Row>
        </S.CustomContainer>
        <S.MoneyWrapper>
          <img src="/images/ic-money.svg" />
          <div>
            <h2>{`R$ ${community.stock && community.stock.money ? community.stock.money.toLocaleString('pt-BR') : '0,00'}`}</h2>
            <p>disponível em caixa</p>
          </div>
        </S.MoneyWrapper>
        <S.ItemsWrapper>
          <S.ItemBox>
            <img src="/images/ic-food.svg" />
            <div>
              <h2>{community.stock && numberWithDot(community.stock.basicBaskets)}</h2>
              <p>Qtde de cestas básicas</p>
            </div>
          </S.ItemBox>
          <S.ItemBox>
            <img src="/images/ic-water.svg" />
            <div>
              <h2>{community.stock && numberWithDot(community.stock.hygieneProducts)}</h2>
              <p>Qtde de kits de limpeza</p>
            </div>
          </S.ItemBox>
          <S.ItemBox>
            <img src="/images/ic-helmet.svg" />
            <div>
              <h2>{community.stock && numberWithDot(community.stock.ppe)}</h2>
              <p>Qtde de EPIs</p>
            </div>
          </S.ItemBox>
        </S.ItemsWrapper>
        <S.CardsWrapper>
          <S.CustomSelect
            classNamePrefix="react-select"
            options={selectOptions}
            isMulti
          />
          {members.map((member, i) => (
            <S.Card key={i}>
              <S.CardIcon>
                <img src="/images/ic-profile.svg" />
              </S.CardIcon>
              <S.CardTitle>
                <h3>{member.name}</h3>
                <p>{member.occupation}</p>
              </S.CardTitle>
              <S.CardHr />
              <S.CardPhone>{member.phone}</S.CardPhone>
              <S.CardHighlight>
                {member.controlledMedication.value && <S.Highlight icon="pill"/>}
                {member.specialNeeds.value && <S.Highlight icon="star"/>}
              </S.CardHighlight>
            </S.Card>
          ))}
        </S.CardsWrapper>
      </S.Wrapper>
    </Layout>
  )
}

CommunityDashboard.propTypes = {
  credentials: PropTypes.object
}

export default CommunityDashboard
