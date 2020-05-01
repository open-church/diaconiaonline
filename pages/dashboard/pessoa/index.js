import React from 'react'

import * as B from '@bootstrap-styled/v4'

import Layout from '../../../components/layout'
import * as S from '../styles'

function UserDashboard () {
  return (
    <Layout>
      <S.Wrapper>
        <S.TopContainer fluid/>
        <S.CustomContainer>
          <B.Row>
            <B.Col>
              <S.H1>Olá!</S.H1>
              <S.P>Este é o painel de visualização de seu cadastro. Nele você pode atualizar seus dados sempre que necessário e informar sua igreja sobre sua situação.</S.P>
            </B.Col>
          </B.Row>
        </S.CustomContainer>
        <S.UserBox>
          <B.Row>
            <B.Col>
              <S.H2>João Carlos da Costa</S.H2>
              <S.KeyValues>Desempregado</S.KeyValues>
              <S.InfoWrapper>
                <S.InfoBox>
                  <S.KeyValues bold specialFloat>
                (89) 9999-9999
                  </S.KeyValues>
                  <S.SpecialWrapper>
                    <S.KeyValues icon="star">
                  PcD
                    </S.KeyValues>
                    <S.KeyValues icon="pill">
                  Medicamentos
                    </S.KeyValues>
                  </S.SpecialWrapper>
                </S.InfoBox>
                <S.InfoBox>
                  <S.KeyValues bold>
                Uso de medicamentos
                  </S.KeyValues>
                  <S.Values>
                  Rivotril
                  </S.Values>
                </S.InfoBox>
                <S.InfoBox>
                  <S.KeyValues bold>
                Urgência
                  </S.KeyValues>
                  <S.Values>
                Fraldas para minha filha. Tamanho RN.
                  </S.Values>
                </S.InfoBox>
                <S.InfoBox>
                  <S.KeyValues bold>
                Endereço
                  </S.KeyValues>
                  <S.Values>
                Alameda dos Buritis, 310, Edifício Leo Lynce, apto 200<br/>
                Setor Oeste, Goiânia - GO<br/>
                75020-340
                  </S.Values>
                </S.InfoBox>
              </S.InfoWrapper>
            </B.Col>
          </B.Row>
        </S.UserBox>
      </S.Wrapper>
    </Layout>
  )
}

export default UserDashboard
