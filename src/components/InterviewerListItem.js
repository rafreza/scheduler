import React from "react";
import classNames from "classnames/bind";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem (props) {
  const InterviewerItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li
      className={InterviewerItemClass}
      onClick={() => props.setInterviewer(props.name)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
