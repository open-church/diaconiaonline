import React from 'react'

import * as S from './styles'

function Footer () {
  return (
    <S.Footer>
      <S.FooterContainer>
        <span>Copyright © Diaconia Online. 2020</span>
        <span>
          Contribua com o projeto no&nbsp;
          <a href="https://github.com/open-church/diaconiaonline" target="_blank" rel="noreferrer" title="Diaconia.online é um projeto open source e está no github">Github</a>
        </span>
      </S.FooterContainer>
    </S.Footer>
  )
}

export default Footer
