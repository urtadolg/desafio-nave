import Row from 'components/Row'
import React from 'react'
import styled from 'styled-components'
import editIcon from 'assets/icons/edit.png'
import deleteIcon from 'assets/icons/delete.png'
import Image from 'components/Image'

const Controllers = ({ onEdit, onDelete }) => {
  return (
    <ControllersContainer>
      <Image style={{ cursor: 'pointer' }} onClick={onEdit} src={editIcon} alt={'Edit'} />
      <Image style={{ cursor: 'pointer' }} onClick={onDelete} src={deleteIcon} alt={'Delete'} />
    </ControllersContainer>
  )
}

const ControllersContainer = styled(Row)`
  gap: 16px;
`

export default Controllers
