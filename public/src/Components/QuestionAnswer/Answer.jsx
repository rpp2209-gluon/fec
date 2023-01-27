import React, { useState, useEffect } from "react";
import parseDate from './parseDate.js';
import axios from 'axios';


var Answer = (props) => {
  const [helpfulness, setHelpfulness] = useState({ click: false, helpfulness: props.answerData.helpfulness });
  const [reportStatus, setReportStatus] = useState(false);
  const usernameDate = () => {
    const name = props.answerData.answerer_name;
    return (
      <p>by {name.toLowerCase() === 'seller' ? <b>{name}</b> : name}, {parseDate(props.answerData.date)}
      </p>
    )
  };

  const handleClickHelpfulness = () => {
    if (!helpfulness.click) {
      var newHelpfulness = { click: true, helpfulness: helpfulness.helpfulness + 1 };
      // COME BACK TO CHECK
      axios.put('http://localhost:3000/answers/helpful', {
        answer_id: props.answerData.answer_id,
      })
        .then(data => console.log(data))
        .catch(err => console.log(err));
      setHelpfulness(newHelpfulness);

    }
  };

  const handleReportClick = () => {
    if (!reportStatus) {
      console.log('asdf', props.answerData.answer_id)
      axios.put('http://localhost:3000/answers/report', {
        answer_id: props.answerData.answer_id,
      })
        .then(data => console.log(data))
        .catch(err => console.log(err)); //
      setReportStatus(true);

    }
  };

  const createImagePreview = () => {
    const imageArr = [];
    for (var i of props.answerData.photos) {
      imageArr.push(<img key={i.id} src={i.url} height='60' width='100' />)
    }
    return <div>{imageArr}</div>;
  };

  return (
    <div id='answers'>
      <p id='answer'>A: {props.answerData.body}</p>
      {usernameDate()}
      {createImagePreview()}
      <p id='answer-helpful' onClick={handleClickHelpfulness}>Helpful? Yes ({helpfulness.helpfulness})</p>
      <p id='answer-report' onClick={handleReportClick}>{reportStatus ? 'Reported' : 'Report'}</p>
    </div>
  )
}

export default Answer;