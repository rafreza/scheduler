import React from 'react';
import "./styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";


export default function Appointment(props) {
  let display;
  if (!props.interview) {
    display = <Empty />; 
  } else {
    display = (
      <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
      />
    );
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {display}
      
    </article>
  );
}