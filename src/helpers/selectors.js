export function getAppointmentsForDay(state, day) {
	const selectedDayObj = state.days.find((item) => item.name === day);

	if (!selectedDayObj) return [];
	else {
		const appointments = selectedDayObj.appointments.map(
			(appointmentsId) => state.appointments[appointmentsId]
		);
		return appointments; // [array of {state.appointments} objects for the {day}]
	}
}

// interview = {student: 'name', interviewer: id}
export function getInterview(state, interview) {
	if (!interview) return null;
	else {
		const interviewersList = state.interviewers; // {}
		const interviewerId = interview.interviewer;

		return { ...interview, interviewer: interviewersList[interviewerId] }; // {student: 'name', interviewer: {id, name, avatar} }
	}
}

export function getInterviewersForDay(state, day) {
	const selectedDayObj = state.days.find((item) => item.name === day);

	if (!selectedDayObj) return [];
	else {
		const interviewersArr = selectedDayObj.interviewers.map(
			(interviewerId) => state.interviewers[interviewerId]
		);
		return interviewersArr; // [array of {state.appointments} objects for the {day}]
	}
}
