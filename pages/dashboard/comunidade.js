import React, { useEffect, useState } from 'react'

import * as B from '@bootstrap-styled/v4'
import Router from 'next/router'
import PropTypes from 'prop-types'

import * as S from '../../components/dashboard/styles'
import Layout from '../../components/layout'
import UserDetails from '../../components/userDetails'
import Api from '../../services/api'

const { PREFIX_COMMUNITY_URL } = process.env

const selectOptions = [
  { value: 'unemployed', label: 'Desempregado' },
  { value: 'specialNeeds', label: 'PcD' },
  { value: 'urgencies', label: 'Urgências' },
  { value: 'controlledMedication', label: 'Necessidade de medicamentos' }
]

function CommunityDashboard ({ credentials }) {
  const [loading, setLoading] = useState(true)
  const [community, setCommunity] = useState({})
  const [occupations, setOccupations] = useState([])
  const [members, setMembers] = useState([])
  const [filteredMembers, setFilteredMembers] = useState([])
  const [modal, setModal] = useState(false)
  const [memberModal, setMemberModal] = useState({})

  useEffect(() => {
    const getCommunity = async () => {
      const communityResponse = await Api.getCommunity()
      const membersResponse = await Api.getMyMembers()
      const occupationsResponse = await Api.getOccupations()
      setOccupations(occupationsResponse.data)
      setCommunity(communityResponse.data)
      setMembers(membersResponse.data)
      setLoading(false)
      setFilteredMembers(membersResponse.data)
    }
    if (!credentials || !credentials.entity) return Router.push('/login/comunidade')
    credentials.entity === 'people' && Router.push('/dashboard/people')
    credentials.entity === 'community' && getCommunity()
  }, [])

  const numberWithDot = (x) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 'Não informado'
  }

  const handleFilter = (data) => {
    const newFilter = []
    let tempFiltered = members
    data && data.map(item => {
      newFilter.push(item.value)
    })
    newFilter.length === 0 &&
      setFilteredMembers(members)

    newFilter.includes('unemployed') &&
      (tempFiltered = tempFiltered.filter(member => member.occupation === 'unemployed'))

    newFilter.includes('specialNeeds') &&
      (tempFiltered = tempFiltered.filter(member => member.specialNeeds &&
        member.specialNeeds.value === true))

    newFilter.includes('controlledMedication') &&
      (tempFiltered = tempFiltered.filter(member => member.controlledMedication &&
        member.controlledMedication.value === true))

    newFilter.includes('urgencies') &&
      (tempFiltered = tempFiltered.filter(member => member.urgencies))

    setFilteredMembers(tempFiltered)
  }

  const handleModal = () => {
    setModal(!modal)
  }

  return (
    <Layout loading={loading} credentials={credentials}>
      <S.Wrapper>
        <S.TopContainer fluid community={true}/>
        <S.CustomContainer>
          <B.Row>
            <B.Col>
              <S.H1>Olá, comunidade!</S.H1>
              <S.P>Este é o seu painel de gerenciamento.<br/>
                Veja quanto sua comunidade tem em caixa, os itens disponíveis para doação e os membros cadastrados. <br />
                O código e link da comunidade para cadastro de outros membros são <S.Code>{community.code}</S.Code> e <S.Code>{PREFIX_COMMUNITY_URL}/{community.code}</S.Code>.
              </S.P>
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
              <p>Cestas básicas</p>
            </div>
          </S.ItemBox>
          <S.ItemBox>
            <img src="/images/ic-water.svg" />
            <div>
              <h2>{community.stock && numberWithDot(community.stock.hygieneProducts)}</h2>
              <p>Kits de limpeza</p>
            </div>
          </S.ItemBox>
          <S.ItemBox>
            <img src="/images/ic-helmet.svg" />
            <div>
              <h2>{community.stock && numberWithDot(community.stock.ppe)}</h2>
              <p>Equipamentos tipo EPI</p>
            </div>
          </S.ItemBox>
        </S.ItemsWrapper>
        <S.CardsWrapper>
          <S.CustomSelect
            classNamePrefix="react-select"
            options={selectOptions}
            isMulti
            onChange={(data) => (handleFilter(data))}
            placeholder="Filtrar por..."
          />
          {filteredMembers.map((member, i) => (
            <S.Card key={i}>
              <S.CardIcon>
                <img src="/images/ic-profile.svg" />
              </S.CardIcon>
              <S.CardTitle>
                <h3>{member.name}</h3>
                <p>{member.occupation &&
                    occupations.find(option => option.value === member.occupation)
                      .label}</p>
              </S.CardTitle>
              <S.CardHr />
              <S.CardPhone>{member.phone && member.phone.replace(/\+[0-9]* /g, '')}</S.CardPhone>
              <S.CardHighlight>
                {member.controlledMedication && member.controlledMedication.value && <S.Highlight icon="pill"/>}
                {member.specialNeeds && member.specialNeeds.value && <S.Highlight icon="star"/>}
              </S.CardHighlight>
              <S.CardLink onClick={() => {
                handleModal()
                setMemberModal(member)
              }} href="#">Ver dados completos</S.CardLink>
            </S.Card>
          ))}
        </S.CardsWrapper>
        <B.Modal className="user-details" isOpen={modal} toggle={handleModal}>
          <B.ModalHeader toggle={handleModal}></B.ModalHeader>
          <B.ModalBody>
            <UserDetails member={memberModal} occupations={occupations}/>
          </B.ModalBody>
        </B.Modal>
      </S.Wrapper>
    </Layout>
  )
}

CommunityDashboard.propTypes = {
  credentials: PropTypes.object
}

export default CommunityDashboard
