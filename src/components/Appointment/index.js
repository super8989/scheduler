import React from 'react';

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import useVisualMode from 'hooks/useVisualMode';

import 'components/Appointment/styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';

function Appointment(props) {
	const { id, time, interview, interviewers } = props;
	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};

		transition(SAVING);
		props.bookInterview(id, interview).then(() => transition(SHOW));
	}

	return (
		<article className='appointment'>
			<Header time={time} />
			{/* {interview ? (<Show student={interview.student} interviewer={interview.interviewer} onEdit onDelete />) : (<Empty onAdd/> )} */}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show student={interview.student} interviewer={interview.interviewer} />
			)}
			{mode === CREATE && (
				<Form interviewers={interviewers} onCancel={back} onSave={save} />
			)}
			{mode === SAVING && <Status message={'Booking your appointment'} />}
		</article>
	);
}

export default Appointment;
