import { parse, format as fnsFormat, addMinutes } from 'date-fns'

const { format } = Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' })

export const limitString = (string, limit) => {
  if (!limit || !string || string.length <= limit) {
    return string
  }

  return `${string.slice(0, limit).trim()}...`
}

export const formatIsoString = isoString => format(new Date(isoString))

export const formatDateToApi = date => parse(date, 'yyyy-MM-dd', new Date()).toISOString()

export const formatDateFromApi = date =>
  fnsFormat(addMinutes(new Date(date), new Date().getTimezoneOffset()), 'yyyy-MM-dd')
