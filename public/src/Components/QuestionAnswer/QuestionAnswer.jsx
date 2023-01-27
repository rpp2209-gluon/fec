import React, { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import instance from '../../../../configAxios.js';
import Question from './Question.jsx';
import QuestionModal from './QuestionModal.jsx';
// import {Modal} from 'react-modal-overlay';
import ReactModal from 'react-modal';
import axios from 'axios';


const question_id = 640996;
const product_id = 71698;
const sortQuestionsByHelpfulness = (data) => {
  data.results.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
  return data;
};
const initialQuestionInputField = 'HAVE A QUESTION? SEARCH FOR ANSWERS...';

var QuestionAnswer = (props) => {
  const [questionData, setQuestionData] = useState({results: []});
  const [searchValue, setSearchValue] = useState(initialQuestionInputField);
  const [searchClickValue, setSearchClickValue] = useState(0);
  const [clickLoadMoreQuestions, setClickLoadMoreQuestions] = useState(false);
  const [numberDisplayQuestions, setNumberDisplayQuestions] = useState(0);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [getQuestion, setGetQuestion] = useState(false);


  // Grab the product data
  useEffect(() => {
    // COME BACK TO CHANGE PRODUCT_ID
    // MAYBE COUNT IS AFFECTING THE SPEED
    axios.get(`http://localhost:3000/questions/${product_id}`)
      .then(data => {
        setQuestionData(sortQuestionsByHelpfulness(data.data));
      })
      .catch(err => console.log(err));
  }, []);

  // Wait until questionData is set and then display the number of questions
  useEffect(() => {
    setNumberDisplayQuestions(questionData.results.length > 1 ? 2 : questionData.results.length);
    setGetQuestion(true);
  }, [questionData])

  // Removing the value from the search when the user clicks on it
  const removeSearchInitialValue = () => {
    if (searchClickValue === 0) {
      setSearchValue('');
      setSearchClickValue(searchClickValue + 1);
    }
  };

  // Changing the search value when the user types
  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  // When the search value is changed then the questions should filter only if the length
  // is greater than 3 and it doesn't equal to the intial placeholder value
  useEffect(() => {
    if (searchValue.length >= 3 && searchValue !== initialQuestionInputField) {
      var newQuestionList = [];
      for (var i of questionData.results) {
        if (i.question_body.toLowerCase().includes(searchValue.toLowerCase())) {
          newQuestionList.push(i);
        }
      }
      const searchObj = {
        ...questionData,
        results: newQuestionList
      };
      setQuestionData(searchObj);
      setNumberDisplayQuestions(searchObj.results.length > 1 ? 2 : searchObj.results.length);
    } else {
      setQuestionData(questionData);
    }
  }, [searchValue])

  // Display the different questions
  var displayQuestionAnswer = () => {
    var resultArr = [];
    for (var i = 0; i < numberDisplayQuestions; i++) {
      resultArr.push(<Question
        key={questionData.results[i].question_id}
        questionData={questionData.results[i]}
        />)
    }
    return resultArr;
  }

  // When 'load more questions' is clicked then more questions should be displayed
  const handleLoadMoreQuestions = () => {
    if (numberDisplayQuestions + 2 > questionData.results.length) {
      setNumberDisplayQuestions(questionData.results.length);
    } else {
      setNumberDisplayQuestions(numberDisplayQuestions + 2);
    }
  };

  // Setting up the the question and answer section
  var QuestionAnswerResult = () => {
    return (
      <div id='questions-and-answers'> QUESTIONS & ANSWERS
        <div id='questions-search'>
          <input type='text' id='inputsearch' name='inputsearch' value={searchValue} onClick={removeSearchInitialValue} onChange={handleSearchChange}></input>
        </div>

        {displayQuestionAnswer()}
        {numberDisplayQuestions !== questionData.results.length ? <button className='loadmorequestions' onClick={handleLoadMoreQuestions}>MORE ANSWERED QUESTIONS</button> : null}

        <button onClick={() => { setShowQuestionModal(true) }}>ADD A QUESTION</button>
        <ReactModal isOpen={showQuestionModal} onRequestClose={() => { setShowQuestionModal(false) }}>
          {/* NEED TO CHANGE THE PRODUCT_ID WHEN EVERYONE FINSIHES */}
          <QuestionModal product_id={product_id} setShowQuestionModal={setShowQuestionModal}/>
        </ReactModal>
      </div>
    )
  }

  return (
    <div id='questions'>
      {getQuestion ? QuestionAnswerResult() : null}
    </div>
  );
};

export default QuestionAnswer;