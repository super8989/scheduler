import React from 'react';

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';

import 'components/Appointment/styles.scss';

function Appointment(props) {
	const { id, time, interview } = props;

	return (
		<article className='appointment'>
			<Header time={time} />
			{interview ? (
				<Show
					student={interview.student}
					interviewer={interview.interviewer}
					// onEdit
					// onDelete
				/>
			) : (
				<Empty
				// onAdd
				/>
			)}
		</article>
	);
}

export default Appointment;
