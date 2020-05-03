import React from 'react'

import PropTypes from 'prop-types'

import * as S from './styles'

const UserDetails = ({ member, occupations }) => {
  console.log(member)
  console.log(occupations.find(option => option.value === member.occupation).label)
  return (
    <S.Card>
      <S.CardIcon>
        <img src="/images/ic-profile.svg" />
      </S.CardIcon>
      <S.CardTitle>
        <h3>{member.name}</h3>
        <p>{member.occupation && occupations.find(option => option.value === member.occupation).label}</p>
      </S.CardTitle>
      <S.CardHr />
      <S.CardSub>{member.phone && member.phone.replace(/\+[0-9]* /g, '')}</S.CardSub>
      <S.CardHighlight>
        {member.specialNeeds && member.specialNeeds.value && <S.Highlight icon="star">PcD</S.Highlight>}
        {member.controlledMedication && member.controlledMedication.value && <S.Highlight icon="pill">Medicamentos</S.Highlight>}
      </S.CardHighlight>
      <S.CardRow>
        <div>
          <S.CardSub>Uso de Medicamentos</S.CardSub>
          <p>{member.controlledMedication.description}</p>
        </div>
        <div>
          <S.CardSub>Urgência</S.CardSub>
          <p>{member.urgencies}</p>
        </div>
        <div>
          <S.CardSub>Endereço</S.CardSub>
        </div>
      </S.CardRow>
    </S.Card>
  )
}

UserDetails.propTypes = {
  member: PropTypes.object,
  occupations: PropTypes.array
}

export default UserDetails
