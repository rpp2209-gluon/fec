import React, { useState, useEffect } from "react";
import parseDate from './parseDate.js';

var Answer = (props) => {
  const [helpfulness, setHelpfulness] = useState({click: false, helpfulness: props.answerData.helpfulness});
  const [reportStatus, setReportStatus] = useState(false);
  const usernameDate = () => {
    const name = props.answerData.answerer_name;
    return (
      <p>by {name.toLowerCase() === 'seller' ? <b>{name}</b> : name}, {parseDate(props.answerData.date)}
      </p>
    )
  };


  const handleClickHelpfulness = () => {
    if (helpfulness.click) {
      var newHelpfulness = {click: false, helpfulness: helpfulness.helpfulness - 1};
      setHelpfulness(newHelpfulness);
    } else {
      var newHelpfulness = {click: true, helpfulness: helpfulness.helpfulness + 1};
      setHelpfulness(newHelpfulness);
    }
  };

  const handleReportClick = () => {
    if (reportStatus) {
      setReportStatus(false);
    } else {
      setReportStatus(true);
    }
  }
  return (
    <div id='answers'>
      <p id='answer'>A: {props.answerData.body}</p>
      {usernameDate()}
      <p id='answer-helpful' onClick={handleClickHelpfulness}>Helpful? Yes ({helpfulness.helpfulness})</p>
      <p id='answer-report' onClick={handleReportClick}>{reportStatus ? 'Reported' : 'Report'}</p>
    </div>
  )
}

export default Answer;