import React from 'react';
import "./styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
import Form from './Form';

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      <Empty />
      <Show />
      <Confirm />
      <Status />
      <Error />
      <Form />
    </article>
  );
}