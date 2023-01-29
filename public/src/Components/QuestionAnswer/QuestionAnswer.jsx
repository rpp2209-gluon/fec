import React, { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
//import instance from 'configAxios.js';
import Question from './Question.jsx';
import QuestionModal from './QuestionModal.jsx';
// import {Modal} from 'react-modal-overlay';
import ReactModal from 'react-modal';
import axios from 'axios';


const sortQuestionsByHelpfulness = (data) => {
  data.results.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
  return data;
};
const initialQuestionInputField = 'HAVE A QUESTION? SEARCH FOR ANSWERS...';

var QuestionAnswer = () => {
  const [initialQuestionData, setInitialQuestionData] = useState(null)
  const [questionData, setQuestionData] = useState({results: []});
  const [searchValue, setSearchValue] = useState(initialQuestionInputField)
  const [searchClickValue, setSearchClickValue] = useState(0);
  const [clickLoadMoreQuestions, setClickLoadMoreQuestions] = useState(false);
  const [numberDisplayQuestions, setNumberDisplayQuestions] = useState(0);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  // const [lastNumberDisplayQuestions, setLastNumberDisplayQuestion] = useState(0);

  useEffect(() => {
    const product_id = 71698;
    axios.get(`http://localhost:3000/questions/${product_id}`)
      .then(data => {
        const sortedData = sortQuestionsByHelpfulness(data.data);
        setInitialQuestionData(sortedData);
        setQuestionData(sortedData);
        console.log(sortedData)
      })
  }, []);

  useEffect(() => {
    setNumberDisplayQuestions(questionData.results.length > 1 ? 2 : questionData.results.length)
  }, [questionData])


  const removeSearchInitialValue = () => {
    if (searchClickValue === 0) {
      setSearchValue('');
      setSearchClickValue(searchClickValue + 1);
    }
  };

  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);

  };

  useEffect(() => {
    if (searchValue.length >= 3 && searchValue !== initialQuestionInputField) {
      var newQuestionList = [];
      for (var i of initialQuestionData.results) {
        if (i.question_body.toLowerCase().includes(searchValue.toLowerCase())) {
          newQuestionList.push(i);
        }
      }
      const searchObj = {
        ...questionData,
        results: newQuestionList
      };
      setQuestionData(searchObj);
      setNumberDisplayQuestions(searchObj.results.length);
    } else {
      setQuestionData(questionData);
    }
  }, [searchValue])

  var displayQuestionAnswer = () => {
    var resultArr = [];
    for (var i = 0; i < numberDisplayQuestions; i++) {
      resultArr.push(<Question key={questionData.results[i].question_id} questionData={questionData.results[i]} />)
    }
    return resultArr;
  }

  const handleLoadMoreQuestions = () => {
    if (numberDisplayQuestions + 2 > questionData.results.length) {
      setNumberDisplayQuestions(questionData.results.length);
    } else {
      setNumberDisplayQuestions(numberDisplayQuestions + 2);
    }
  };

  // const modalQuestionContents = () => {
  //   return <QuestionModal />;
  // }

  var QuestionAnswerResult = () => {
    return (
      <div id='questions-and-answers'> QUESTIONS & ANSWERS
        <div id='questions-search'>
          <input type='text' id='inputsearch' name='inputsearch' value={searchValue} onClick={removeSearchInitialValue} onChange={handleSearchChange}></input>
        </div>

        {displayQuestionAnswer()}
        {numberDisplayQuestions !== questionData.results.length ? <button className='loadmorequestions' onClick={handleLoadMoreQuestions}>MORE ANSWERED QUESTIONS</button> : null}

        <button onClick={() => { setShowQuestionModal(true) }}>ADD A QUESTION</button>
        <ReactModal ariaHideApp={false} isOpen={showQuestionModal} onRequestClose={() => { setShowQuestionModal(false) }}>
          <QuestionModal product_id={questionData.product_id} setShowQuestionModal={setShowQuestionModal}/>
        </ReactModal>
      </div>
    )
  }

  return (
    <div id='questions'>
      {QuestionAnswerResult()}
    </div>
  );
};

export default QuestionAnswer;