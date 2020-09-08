import React from 'react';

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';
import useVisualMode from 'hooks/useVisualMode';

import 'components/Appointment/styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

function Appointment(props) {
	const { id, time, interview, interviewers } = props;
	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};

		transition(SAVING, true);
		props
			.bookInterview(id, interview)
			.then(() => transition(SHOW))
			.catch((error) => transition(ERROR_SAVE, true));
	}

	// Delete the appointment from database
	function cancelInterview() {
		transition(DELETING, true);
		props
			.cancelInterview(id)
			.then(() => transition(EMPTY))
			.catch((error) => transition(ERROR_DELETE, true));
	}

	// Render a delete confirm component
	function confirmRemove() {
		transition(CONFIRM);
	}

	function onEdit() {
		transition(EDIT);
	}

	return (
		<article className='appointment' data-testid='appointment'>
			<Header time={time} />
			{/* {interview ? (<Show student={interview.student} interviewer={interview.interviewer} onEdit onDelete />) : (<Empty onAdd/> )} */}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={interview.student}
					interviewer={interview.interviewer}
					onDelete={confirmRemove}
					onEdit={onEdit}
				/>
			)}
			{mode === CREATE && (
				<Form interviewers={interviewers} onCancel={back} onSave={save} />
			)}
			{mode === SAVING && <Status message={'Saving'} />}
			{mode === DELETING && <Status message={'Deleting'} />}
			{mode === CONFIRM && (
				<Confirm
					message={'Delete your booking?'}
					onCancel={back}
					onConfirm={cancelInterview}
				/>
			)}
			{mode === EDIT && (
				<Form
					name={interview.student}
					interviewer={interview.interviewer.id}
					interviewers={interviewers}
					onCancel={back}
					onSave={save}
				/>
			)}
			{(mode === ERROR_DELETE || mode === ERROR_SAVE) && (
				<Error onClose={back} message={'Please try again'} />
			)}
		</article>
	);
}

export default Appointment;
