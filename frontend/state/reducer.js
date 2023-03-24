// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux';
import * as types from './action-types'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch(action.type){
    case types.MOVE_CLOCKWISE:
      return action.payload
    case types.MOVE_COUNTERCLOCKWISE:
      return action.payload  
    default:
      return state
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch(action.type){
    case types.RESET_FORM:
      return initialQuizState
    case types.SET_QUIZ_INTO_STATE:
      return action.payload
      // return { option_id: null, quiz: action.payload }
    default:
      return state
  }
}

const initialSelectedAnswerState = {
  answer_id: ''
}
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type){
    case types.RESET_FORM:
      return initialSelectedAnswerState
    case types.SET_SELECTED_ANSWER:
      return { ...state, answer_id: action.payload }
    default:
      return state
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type){
    case types.RESET_FORM:
      return initialMessageState
    case types.SET_INFO_MESSAGE:
      return action.payload  
    default:
      return state
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type){
    case types.RESET_FORM:
      return initialFormState
    default:
      return state
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
