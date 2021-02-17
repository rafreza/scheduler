import React from 'react';
import "./styles.scss";

import Header from "./Header"
import Empty from "./Empty"

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      <Empty />
    </article>
  );
}