import React from 'react'

import { Container, Col, Row } from '@bootstrap-styled/v4'
import styled from 'styled-components'

function HomePage () {
  return (
    <div>
      <Title>My First Next.js Page</Title>
      <Container>
        <Row>
          <Col lg="2">
    1 of 3
          </Col>
          <Col xs="12" md="auto" lg="8">
    Variable width content
          </Col>
          <Col lg="2">
    3 of 3
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const Title = styled.h1`
  color: red;
`

export default HomePage
