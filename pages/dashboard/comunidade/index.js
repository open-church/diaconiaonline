import React from 'react'

import * as B from '@bootstrap-styled/v4'

import Layout from '../../../components/layout'
import * as S from '../styles'

const dadosTemp = [
  {
    name: 'Carlos José da Silva',
    cpf: '73021555187',
    email: 'user@gmail.com',
    password: '123456',
    occupation: 'retired',
    communityRelation: 'member',
    specialNeeds: {
      value: false,
      description: ''
    },
    controlledMedication: {
      value: true,
      description: 'Pregabalina'
    },
    address: {
      street: 'Rua dos Cravos',
      complement: 'Qd 68 Lt 58',
      number: 'S/N',
      neighborhood: 'Goiânia 2',
      city: 'Goiânia',
      state: 'GO',
      country: 'BR',
      zipCode: '74663230'
    }
  },
  {
    name: 'Carlos José da Silva',
    cpf: '73021555187',
    email: 'user@gmail.com',
    password: '123456',
    occupation: 'retired',
    communityRelation: 'member',
    specialNeeds: {
      value: true,
      description: 'Mobilidade reduzida'
    },
    controlledMedication: {
      value: false,
      description: ''
    },
    address: {
      street: 'Rua dos Cravos',
      complement: 'Qd 68 Lt 58',
      number: 'S/N',
      neighborhood: 'Goiânia 2',
      city: 'Goiânia',
      state: 'GO',
      country: 'BR',
      zipCode: '74663230'
    }
  },
  {
    name: 'Carlos José da Silva',
    cpf: '73021555187',
    email: 'user@gmail.com',
    password: '123456',
    occupation: 'retired',
    communityRelation: 'member',
    specialNeeds: {
      value: true,
      description: 'Mobilidade reduzida'
    },
    controlledMedication: {
      value: true,
      description: 'Pregabalina'
    },
    address: {
      street: 'Rua dos Cravos',
      complement: 'Qd 68 Lt 58',
      number: 'S/N',
      neighborhood: 'Goiânia 2',
      city: 'Goiânia',
      state: 'GO',
      country: 'BR',
      zipCode: '74663230'
    }
  },
  {
    name: 'Carlos José da Silva',
    cpf: '73021555187',
    email: 'user@gmail.com',
    password: '123456',
    occupation: 'retired',
    communityRelation: 'member',
    specialNeeds: {
      value: true,
      description: 'Mobilidade reduzida'
    },
    controlledMedication: {
      value: true,
      description: 'Pregabalina'
    },
    address: {
      street: 'Rua dos Cravos',
      complement: 'Qd 68 Lt 58',
      number: 'S/N',
      neighborhood: 'Goiânia 2',
      city: 'Goiânia',
      state: 'GO',
      country: 'BR',
      zipCode: '74663230'
    }
  }
]

const selectOptions = [
  { value: 'ununployed', label: 'Desempregado' },
  { value: 'specialNeeds', label: 'PcD' },
  { value: 'urgency', label: 'Urgências' },
  { value: 'controlledMedication', label: 'Necessidade de medicamentos' }
]

function CommunityDashboard () {
  return (
    <Layout>
      <S.Wrapper>
        <S.TopContainer fluid community={true}/>
        <S.CustomContainer>
          <B.Row>
            <B.Col>
              <S.H1>Olá, comunidade!</S.H1>
              <S.P>Este é o seu painel de gerenciamento.<br/>
              Veja quanto sua igreja tem em caixa, os itens disponíveis para doação e os membros cadastrados.</S.P>
            </B.Col>
          </B.Row>
        </S.CustomContainer>
        <S.MoneyWrapper>
          <img src="/images/ic-money.svg" />
          <div>
            <h2>R$ 400,00</h2>
            <p>disponível em caixa</p>
          </div>
        </S.MoneyWrapper>
        <S.ItemsWrapper>
          <S.ItemBox>
            <img src="/images/ic-food.svg" />
            <div>
              <h2>400</h2>
              <p>cesta(s) básicas(s)</p>
            </div>
          </S.ItemBox>
          <S.ItemBox>
            <img src="/images/ic-water.svg" />
            <div>
              <h2>250</h2>
              <p>kit(s) de limpeza</p>
            </div>
          </S.ItemBox>
          <S.ItemBox>
            <img src="/images/ic-helmet.svg" />
            <div>
              <h2>100</h2>
              <p>equip.(s) EPI</p>
            </div>
          </S.ItemBox>
        </S.ItemsWrapper>
        <S.CardsWrapper>
          <S.CustomSelect
            classNamePrefix="react-select"
            options={selectOptions}
            isMulti
          />
          {dadosTemp.map((dado, i) => (
            <S.Card key={i}>
              <S.CardIcon>
                <img src="/images/ic-profile.svg" />
              </S.CardIcon>
              <S.CardTitle>
                <h3>
                  {dado.name}
                </h3>
                <p>
                  {dado.occupation}
                </p>
              </S.CardTitle>
              <S.CardHr />
              <S.CardPhone>
                (99) 99999-9999
              </S.CardPhone>
              <S.CardHighlight>
                {dado.controlledMedication.value && <S.Highlight icon="pill" bold>Medicamentos</S.Highlight>}
                {dado.specialNeeds.value && <S.Highlight icon="star">PcD</S.Highlight>}
              </S.CardHighlight>
            </S.Card>
          ))}
        </S.CardsWrapper>
      </S.Wrapper>
    </Layout>
  )
}

export default CommunityDashboard
