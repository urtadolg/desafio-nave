import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

yup.setLocale({
  mixed: {
    required: 'Campo obrigatório'
  }
})

const emptyStringToNull = (value, originalValue) => {
  if (originalValue === '') {
    return null
  }
  return value
}

const yupShapeWithResolver = shape => yupResolver(yup.object().shape(shape))

export const loginResolver = yupShapeWithResolver({
  email: yup.string().email('Insira um e-mail válido').required(),
  password: yup.string().required('Insira uma senha')
})

export const userFormResolver = yupShapeWithResolver({
  admission_date: yup.string().required('Insira uma data de Admissão'),
  name: yup.string().min(2, 'Mínimo de 2 caracteres no campo').required('Insira um Nome'),
  job_role: yup.string().required('Insira um Cargo'),
  birthdate: yup.string().required('Insira uma data'),
  project: yup.string().required('Insira um projeto'),
  url: yup.string().required('Insira uma imagem de perfil')
})

/*   {
	"job_role": "Dev",
	"admission_date": "20/10/2019",
	"birthdate": "12/04/1992",
	"name": "Christian Tavares",
	"project": "Recrutamento",
	"url": "test-path/image-test.png"
} */
