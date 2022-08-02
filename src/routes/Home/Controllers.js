import React from 'react'
import styled from 'styled-components'

const Controllers = ({ onEdit, onDelete }) => {
  return (
    <ControllersContainer>
      <Image onClick={/* () => history.push(`/navers/${naverId}`) */ onEdit} src={editIcon} alt={'Edit'} />
      <Image onClick={/* () => setIsDeleteModalOpened(true) */ onDelete} src={deleteIcon} alt={'Delete'} />
    </ControllersContainer>
  )
}

const ControllersContainer = styled(Row)`
  gap: 16px;
`

export default Controllers
