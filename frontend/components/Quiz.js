import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, selectAnswer } from '../state/action-creators'

export function Quiz(props) {
  console.log(props);
  useEffect(() =>{
    props.fetchQuiz()
  }, [])

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div className={props.quiz.answers[0].text ? "answer selected" : "answer"}>
                {props.quiz.answers[0].text}
                <button>
                  SELECTED
                </button>
              </div>

              <div className={props.quiz.answers[1].text ? "answer selected" : "answer"}>
              {props.quiz.answers[1].text}
                <button onClick={() => selectAnswer(props.quiz.answers[1].answer_id)}>
                  {props.selectedAnswer.answer_id === props.quiz.answers[1].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st => ({
  quiz: st.quiz,
  selectedAnswer: st.selectedAnswer
}), {
  fetchQuiz,
  selectAnswer
})(Quiz);