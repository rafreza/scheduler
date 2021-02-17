import React, { useState } from 'react';
import Button from '../Button';
import InterviewerList from '../InterviewerList';

export default function Form(props) {
  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    setName('');
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  function save() {
    props.onSave(name, interviewer);
    reset();
  }
  function onChange(event) {
    setName(event.target.value);
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={ name }
            onChange={ onChange }
            type="text"
            placeholder="Enter Student Name"
            /*
          This must be a controlled component
        <DayList days={days} day={day} setDay={setDay} />

        */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={save}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );

} 