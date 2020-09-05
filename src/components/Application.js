import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
} from 'helpers/selectors';

import 'components/Application.scss';

function Application(props) {
	const [state, setState] = useState({
		day: 'Monday',
		days: [],
		appointments: {},
		interviewers: {},
	});

	const setDay = (day) => setState((prevState) => ({ ...prevState, day }));
	// const setDays = (days) => setState((prev) => ({ ...prev, days }));

	useEffect(() => {
		Promise.all([
			axios.get('/api/days'),
			axios.get('/api/appointments'),
			axios.get('/api/interviewers'),
		]).then((all) => {
			// console.log('all', all);
			setState((prev) => ({
				...prev,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			}));
		});
	}, []);

	function bookInterview(id, interview) {
		// console.log('bookInterview id', id); // id = 2
		// console.log('bookInterview interview', interview); // interview = { student: 'sam', interviewer: 3}

		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		return axios
			.put(`/api/appointments/${id}`, {
				...state.appointments[id],
				interview,
			})
			.then((res) => {
				// console.log('axios.put res: \n', res);
				setState((prev) => ({
					...prev,
					appointments,
				}));
			});
	}

	function cancelInterview(id) {
		// console.log('cancelInterview id:', id);

		const appointment = {
			...state.appointments[id],
			interview: null,
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		return axios
			.delete(`/api/appointments/${id}`, {
				...state.appointments[id],
				interview: null,
			})
			.then((res) => {
				// console.log('axios.put res: \n', res);
				setState((prev) => ({
					...prev,
					appointments,
				}));
			});
	}

	return (
		<main className='layout'>
			<section className='sidebar'>
				<img
					className='sidebar--centered'
					src='images/logo.png'
					alt='Interview Scheduler'
				/>
				<hr className='sidebar__separator sidebar--centered' />
				<nav className='sidebar__menu'>
					<DayList days={state.days} day={state.day} setDay={setDay} />
				</nav>
				<img
					className='sidebar__lhl sidebar--centered'
					src='images/lhl.png'
					alt='Lighthouse Labs'
				/>
			</section>
			<section className='schedule'>
				{/* {console.log('state.appointments', state.appointments)}
				{console.log('state.interviewers', state.interviewers)} */}
				{getAppointmentsForDay(state, state.day).map((appointment) => {
					// console.log('getInterview interview', interview); console.log('appointment', appointment);
					return (
						<Appointment
							{...appointment}
							key={appointment.id}
							interview={getInterview(state, appointment.interview)}
							interviewers={getInterviewersForDay(state, state.day)}
							bookInterview={bookInterview}
							cancelInterview={cancelInterview}
						/>
					);
				})}
				<Appointment key={'last'} time={'5PM'} />
			</section>
		</main>
	);
}

export default Application;
