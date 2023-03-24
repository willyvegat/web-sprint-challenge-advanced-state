import * as types from './action-types';

import axios from 'axios';

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise(num) { 
  return { type: types.MOVE_CLOCKWISE, payload: num}
}

export function moveCounterClockwise(num) { 
  return { type: types.MOVE_COUNTERCLOCKWISE, payload: num}
}

export function selectAnswer(answer_id) { 
  return { type: types.SET_SELECTED_ANSWER, payload: answer_id}
}

export function setMessage(message) { 
  return { type: types.SET_INFO_MESSAGE, payload: message}
}

export function setQuiz(quiz) { 
  return { type: types.SET_QUIZ_INTO_STATE, payload: quiz}
}

export function inputChange({ name, value }) {
  // console.log(value);
  const payload = { name, value }
  // console.log("from inside the action creator")
  return { type: types.INPUT_CHANGE, payload }
 }

export function resetForm() {
  return { type: types.RESET_FORM }
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(resetForm());
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        dispatch(setQuiz(res.data));
      })
      .catch(err => {
        console.log(err);
      })
  }
}
export function postAnswer({quiz_id, answer_id}) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios.post("http://localhost:9000/api/quiz/answer", {quiz_id, answer_id})
      .then(res => {
        dispatch(resetForm());
        dispatch(setMessage(res.data.message));
        dispatch(fetchQuiz());
      })
      .catch(err => {
        console.log(err);
      })
  }
}
export function postQuiz({ question_text, true_answer_text, false_answer_text }) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post('http://localhost:9000/api/quiz/new', { question_text, true_answer_text, false_answer_text })
      .then(res => {
        // console.log(res);
        // setQuiz(res.data)
        dispatch(setMessage(`Congrats: "${question_text}" is a great question!`))
        // dispatch(setMessage(`${res.request.status} ${res.request.statusText}`))
        // dispatch(setQuiz(res.data));
        dispatch(resetForm());
      })
      .catch(err => {
        dispatch(setMessage(err.response.data.message));
      })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
