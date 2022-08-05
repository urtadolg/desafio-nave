import client from 'providers/fetchClient'
import { gql } from '@apollo/client'
import { formatDateFromApi, formatIsoString } from 'helpers'
import { format } from 'date-fns'

export const getUserById = async ({ queryKey: [key, id] }) => {
  const response = await client.get(`/v1/navers/${id}`)

  return {
    ...response,
    birthdate: formatDateFromApi(response.birthdate),
    admission_date: formatDateFromApi(response.admission_date)
  }
}

export const getAllRoles = async () => {
  const { results } = await client.get('/v1/roles')
  return results.map(item => ({ label: item.role, value: item.id }))
}

export const getUsers = async params => {
  const { results, pageCount } = await client.get('/v1/users', {
    params: { ...params, created_at: params?.created_at ? format(params.created_at, 'yyyy-MM-dd') : null }
  })

  return {
    pageCount,
    results: results.map(user => ({
      ...user,
      formattedCreatedAt: formatIsoString(user.created_at)
    }))
  }
}

export const createUser = ({ birthdate, admission_date, ...data }) =>
  client.post('/v1/navers', {
    ...data,
    birthdate: formatIsoString(birthdate),
    admission_date: formatIsoString(admission_date)
  })

export const updateUser = (id, { birthdate, admission_date, ...data }) => {
  const formatedBirthdate = formatIsoString(birthdate)
  const formatedAdmissionDate = formatIsoString(admission_date)

  client.put(`/v1/navers/${id}`, {
    ...data,
    birthdate: formatedBirthdate,
    admission_date: formatedAdmissionDate
  })
}

export const deleteUser = async id => await client.delete(`/v1/users/${id}`)

export const getUser = async () => await client.get('/v1/users/d956bb14-5b5d-4757-a3aa-25f90da7774e')

// example of a graphql query
export const GET_USER = gql`
  query GetUser {
    user {
      id
      name
      email
      document
    }
  }
`

//example of rest query using graphql
export const userQuery = gql`
  query getUser {
    me @rest(type: User, path: "/v1/me") {
      id
      name
      email
      document
    }
  }
`

export const login = data => client.post('/v1/users/login', data)
