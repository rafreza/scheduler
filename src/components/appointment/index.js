import React from 'react';
import "./styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Form from "./Form";
import Status from './Status';
import Error from './Error';

import useVisualMode from "../../hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

  function save(name, interviewer) {
    transition(SAVE);
    const interview = {
      student: name,
      interviewer
    }
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function del() {
    transition(DELETE, true);
    props
      .deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }
  
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={()=> transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          bookInterview={props.bookInterview}
          onSave={save}
          onCancel={() => back()} 
        />
      )}
      {mode === SAVE && <Status message="Saving appointment" />}
      {mode === DELETE && <Status message="Deleting appointment" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this appointment?"
          onCancel={() => back()}
          onConfirm={del}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          bookInterview={props.bookInterview}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message = "There was an error while saving your appointment, please try again."
          onClose ={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message = "There was an error while deleting your appointment, please try again."
          onClose = {() => back()}
        />
      )}
    </article>
  );
}