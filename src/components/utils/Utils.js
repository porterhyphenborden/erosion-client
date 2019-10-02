import moment from 'moment'

export function NiceDate({ date }) {
  return moment(date).format("MM/DD/YY")
}