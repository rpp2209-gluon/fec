import React, {useState} from 'react';

const QuestionModal = (props, { onClose }) => {
  const [questionField, setQuestionField] = useState('');
  const [nicknameField, setNicknameField] = useState('');
  const [emailField, setEmailField] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div id='question-modal'>
      <form onSubmit={handleFormSubmit}>
        <h2 className='question-modal-heading'>Ask Your Question</h2>
        <h3 className='question-modal-subheading'>About the [Product Name Here]</h3>
        Your Question * <input className='question-modal-question' name='question-modal-question' type="text" />
        What is your nickname * <input className='question-modal-nickname' name='question-modal-nickname' type="text" />
        Your email * <input className='question-modal-email' name='question-modal-email' type="text" />
        <button className='question-modal-close'onClick={onClose}>Close</button>
        <input className='question-modal-submit' type='submit' />
      </form>
    </div>
  )
};

export default QuestionModal;