import React, { useState } from 'react';

import InterviewerListItem from 'components/InterviewerListItem';
import 'components/InterviewerList.scss';

function InterviewerList(props) {
	const { interviewers } = props;

	return (
		<section className='interviewers'>
			<h4 className='interviewers__header text--light'>Interviewer</h4>
			<ul className='interviewers__list'>
				{interviewers.map((person) => (
					<InterviewerListItem
						key={person.id}
						avatar={person.avatar}
						name={person.name}
						setInterviewer={(event) => props.setInterviewer(person.id)}
						selected={props.interviewer === person.id}
						// {...person}
					/>
				))}
			</ul>
		</section>
	);
}

export default InterviewerList;
