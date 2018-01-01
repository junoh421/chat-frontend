import _ from 'lodash'

export default function(state = {}, action) {
  switch(action.type) {
    case 'FETCH_MESSAGES':
      return _.mapKeys(action.payload.messages, 'id')
  default:
    return state
  }
}
