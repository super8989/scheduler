import React from 'react';

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import useVisualMode from 'hooks/useVisualMode';

import 'components/Appointment/styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';

function Appointment(props) {
	const { id, time, interview, onAdd } = props;
	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

	return (
		<article className='appointment'>
			<Header time={time} />
			{/* {interview ? (<Show student={interview.student} interviewer={interview.interviewer} onEdit onDelete />) : (<Empty onAdd/> )} */}
			{mode === EMPTY && <Empty onAdd={onAdd} />}
			{mode === SHOW && (
				<Show student={interview.student} interviewer={interview.interviewer} />
			)}
		</article>
	);
}

export default Appointment;
