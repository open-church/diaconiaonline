import React from 'react'

import * as B from '@bootstrap-styled/v4'

import * as E from '../components/elements/styles'
import * as S from '../components/homeStyles/styles'
import Layout from '../components/layout'

function HomePage () {
  return (
    <Layout navBarBgActive>
      {/* <B.Container>
        <B.Row>
          <B.Col lg="5" xl="6" />
          <B.Col lg="7" xl="6">
            <S.ContentWrapper>
              <S.H2>Organize e acompanhe os recursos de sua comunidade com um clique.</S.H2>
              <S.P>Com o Diaconia Online você pode gerir os recursos de sua comunidade e fazer a assistência de seus membros, apenas acessando a plataforma sem nenhum custo. Cadastre-se e aproveite as nossas funcionalidades.</S.P>
              <S.ButtonsWrapper>
                <E.CustomButton tag={B.A} href="/login/comunidade" color="info">Entrar como comunidade</E.CustomButton>
                <E.CustomButton tag={B.A} href="/login/pessoa" color="secondary">Entrar como membro</E.CustomButton>
              </S.ButtonsWrapper>
            </S.ContentWrapper>
          </B.Col>
        </B.Row>
      </B.Container>
      <B.Container>
        <B.Row>
          <B.Col>
            <div>
              <p>Lorem</p>
              <p>Lorem</p>
              <p>Lorem</p>
              <p>Lorem</p>
            </div>
          </B.Col>
        </B.Row>
      </B.Container> */}
      <S.Wrapper>
        <B.Container>
          <S.CustomRow>
            <B.Col lg="6">
              <S.Img src="/images/diaconia-online-hero-image.png" alt="Capelania Online" />
            </B.Col>
            <B.Col lg="6">
              <S.H2>Organize e acompanhe os recursos de sua comunidade com um clique.</S.H2>
              <S.P>Com o Diaconia Online você pode gerir os recursos de sua comunidade e fazer a assistência de seus membros, apenas acessando a plataforma sem nenhum custo. Cadastre-se e aproveite as nossas funcionalidades.</S.P>
              <S.ButtonsWrapper>
                <E.CustomButton tag={B.A} href="/login/comunidade" color="info">Entrar como comunidade</E.CustomButton>
                <E.CustomButton tag={B.A} href="/login/pessoa" color="primary">Entrar como membro</E.CustomButton>
              </S.ButtonsWrapper>
            </B.Col>
          </S.CustomRow>
        </B.Container>
        <S.CustomContainer bg="matisse" fluid id="sobre-diaconia-online">
          <B.Container>
            <B.Row>
              <S.BlueCol lg="6">
                <S.Img src="/images/diaconia-online-o-que-e.png" alt="Capelania Online" />
              </S.BlueCol>
              <B.Col lg="6">
                <S.H2 color="brightSun">O que é o Diaconia Online?</S.H2>
                <S.P color="white">Diante da situação de crise provocada pela pandemia do COVID-19, se faz necessária uma maior atenção e planejamento em relação ao auxílio de pessoas que tenham alguma necessidade.</S.P>
                <S.P color="white">Nosso papel é auxiliar igrejas no cadastramento, organização e gestão das pessoas que participam ou são assistidas por elas, possibilitando uma visão macro da situação.</S.P>
                <S.P color="white">Tudo isso por meio de uma plataforma web, gratuita e de código livre, desenvolvida e administrada de forma voluntária, para cadastramento e monitoramento de pessoas e recursos.</S.P>
              </B.Col>
            </B.Row>
          </B.Container>
        </S.CustomContainer>
        <B.Container>
          <S.CustomRow style={{ paddingBottom: 0 }}>
            <B.Col><S.H2 color="orangePeel">Como Funciona?</S.H2></B.Col>
          </S.CustomRow>
          <S.CustomRow style={{ paddingTop: 0 }}>
            <S.StepsCol>
              <S.ImgSteps src="/images/diaconia-online-como-funciona-1.svg" alt="Capelania Online" />
              <S.PStepes><b>1.</b> A igreja se cadastra na plataforma e repassa o link/código gerado para membros ou pessoas a quem presta assistências.</S.PStepes>
            </S.StepsCol>
            <S.StepsCol>
              <S.ImgSteps src="/images/diaconia-online-como-funciona-2.svg" alt="Capelania Online" />
              <S.PStepes><b>2.</b> Os membros se cadastram com o código e compartilham suas necessidades e informações com a igreja.</S.PStepes>
            </S.StepsCol>
            <S.StepsCol>
              <S.ImgSteps src="/images/diaconia-online-como-funciona-3.svg" alt="Capelania Online" />
              <S.PStepes><b>3.</b> Se os membros tiverem emergências ou necessitarem de mudança nos dados, podem alterá-los em seu perfil na plataforma.</S.PStepes>
            </S.StepsCol>
            <S.StepsCol>
              <S.ImgSteps src="/images/diaconia-online-como-funciona-4.svg" alt="Capelania Online" />
              <S.PStepes><b>4.</b> A igreja recebe as atualizações e pode entrar em contato com a pessoa para auxiliá-la.</S.PStepes>
            </S.StepsCol>
          </S.CustomRow>
        </B.Container>
        <B.Container>
          <S.CustomRow>
            <B.Col lg="6">
              <S.Img src="/images/diaconia-online-por-que.png" alt="Capelania Online" />
            </B.Col>
            <B.Col lg="6">
              <S.H2 color="burningOrange">Por que utilizar?</S.H2>
              <S.H3>Gestão</S.H3>
              <S.P>Contribuir na organização dos recursos, para que eles possam ser melhor distribuídos.</S.P>
              <S.H3>Monitoramento</S.H3>
              <S.P>Ter informações atualizadas em tempo real para monitorar a situação da comunidade.</S.P>
              <S.H3>Planejamento</S.H3>
              <S.P>Ter uma visão macro da situação e planejar possíveis necessidades emergenciais.</S.P>
            </B.Col>
          </S.CustomRow>
        </B.Container>
        <S.GrayContainer fluid>
          <B.Container>
            <S.CustomRow>
              <B.Col lg="6">
                <S.H2 color="matisse">Gostaria de contribuir?</S.H2>
                <S.P>Veja quais são as formas para você ajudar o nosso projeto a chegar a mais pessoas:</S.P>
              </B.Col>
              <B.Col lg="6">
                <S.H3 color="burningOrange">Divulgue nosso projeto</S.H3>
                <S.P>Fale sobre o nosso projeto em suas redes sociais, para seus amigos e na sua igreja local, caso faça parte de uma.</S.P>
                <S.H3 color="burningOrange">Contribua para o projeto</S.H3>
                <S.P>Faça uma contribuição financeira para ajudar com os custos do projeto e continuar mantendo a plataforma 100% grátis.</S.P>
                <S.H3 color="burningOrange">Seja um voluntário</S.H3>
                <S.P>Caso tenha interesse em ajudar a construir o Diaconia Online, cadastre-se clicando aqui.</S.P>
              </B.Col>
            </S.CustomRow>
          </B.Container>
        </S.GrayContainer>
      </S.Wrapper>
    </Layout>
  )
}

export default HomePage
