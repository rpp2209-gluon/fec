import React, { useState, useEffect } from "react";
import Answer from './Answer.jsx';
import ReactModal from 'react-modal';
import AnswerModal from './AnswerModal.jsx';

const sortAnswersByHelpfulness = (data) => {
  const sellerData = [];
  const otherData = [];
  for (var i in data) {
    if (data[i].answerer_name.toLowerCase() === 'seller') {
      sellerData.push(data[i]);
    } else {
      otherData.push(data[i]);
    }
  }
  sellerData.sort((a, b) => b.helpfulness - a.helpfulness);
  otherData.sort((a, b) => b.helpfulness - a.helpfulness);
  return sellerData.concat(otherData);
};

var Question = (props) => {
  const [numberDisplayAnswers, setNumberDisplayAnswers] = useState(Object.keys(props.questionData.answers).length > 1 ? 2 : Object.keys(props.questionData.answers).length);
  const [helpfulness, setHelpfulness] = useState({ click: false, helpfulness: props.questionData.question_helpfulness });
  const [showAnswerModal, setShowAnswerModal] = useState(false);

  var displayAnswer = () => {
    var resultArr = [];
    const sortedAnswersArr = sortAnswersByHelpfulness(props.questionData.answers);
    for (var i = 0; i < numberDisplayAnswers; i++) {
      resultArr.push(<Answer key={sortedAnswersArr[i].id} answerData={sortedAnswersArr[i]} />)
    }
    return resultArr;
  };

  const handleLoadMoreAnswers = () => {
    setNumberDisplayAnswers(Object.keys(props.questionData.answers).length);
  };

  const handleCollapseAnswers = () => {
    setNumberDisplayAnswers(2);
  };

  const showMoreAnswers = () => {
    if (numberDisplayAnswers < 2) {
      return null;
    } else if (numberDisplayAnswers !== Object.keys(props.questionData.answers).length) {
      return <p className='see-more-answers' onClick={handleLoadMoreAnswers}>SEE MORE ANSWERS</p>
    } else {
      return <p className='collapse-answers' onClick={handleCollapseAnswers}>COLLAPSE ANSWERS</p>
    }
  };

  const handleClickHelpfulness = () => {
    if (helpfulness.click) {
      var newHelpfulness = { click: false, helpfulness: helpfulness.helpfulness - 1 };
      setHelpfulness(newHelpfulness);
    } else {
      var newHelpfulness = { click: true, helpfulness: helpfulness.helpfulness + 1 };
      setHelpfulness(newHelpfulness);
    }
  };

  const handleAddAnswerClick = () => {
    setShowAnswerModal(true);
  }

  return (
    <div>
      <p id='question'>Q: {props.questionData.question_body}</p>
      <p onClick={handleClickHelpfulness}>Helpful? Yes ({helpfulness.helpfulness})</p>
      {displayAnswer()}
      {showMoreAnswers()}
      <p id='add-answer' onClick={handleAddAnswerClick}>ADD ANSWER</p>
      <ReactModal isOpen={showAnswerModal} onRequestClose={() => { setShowAnswerModal(false) }}>
          <AnswerModal setShowAnswerModal={setShowAnswerModal}/>
        </ReactModal>
    </div>
  )
}

export default Question;