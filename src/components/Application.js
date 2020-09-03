import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import { getAppointmentsForDay } from 'helpers/selectors';

import 'components/Application.scss';

// const days = [{id: 1, name: 'Monday', spots: 2}, {id: 2, name: 'Tuesday', spots: 5}, {id: 3, name: 'Wednesday', spots: 0}];

// const appointments = [
// 	{id: 1, time: '12pm'},
// 	{id: 2, time: '1pm',
// 		interview: {
// 			student: 'Lydia Miller-Jones',
// 			interviewer: {
// 				id: 1,
// 				name: 'Sylvia Palmer',
// 				avatar: 'https://i.imgur.com/LpaY82x.png',
// 			},
// 		},
// 	},
// 	{
// 		id: 3,
// 		time: '2pm',
// 	},
// 	{
// 		id: 4,
// 		time: '3pm',
// 		interview: {
// 			student: 'Archie Cohen',
// 			interviewer: {
// 				id: 2,
// 				name: 'Tori Malcom',
// 				avatar: 'https://i.imgur.com/Nmx0Qxo.png',
// 			},
// 		},
// 	},
// 	{
// 		id: 5,
// 		time: '4pm',
// 		interview: {
// 			student: 'Maria Boucher',
// 			interviewer: {
// 				id: 3,
// 				name: 'Mildren Nazir',
// 				avatar: 'https://i.imgur.com/T2WwVfS.png',
// 			},
// 		},
// 	},
// ];

function Application(props) {
	// const [today, setToday] = useState('Monday');
	// const [days, setDays] = useState([]);

	const [state, setState] = useState({
		day: 'Monday',
		days: [],
		appointments: {},
	});

	const setDay = (day) => setState({ ...state, day });
	// const setDays = (days) => setState((prev) => ({ ...prev, days }));

	const daysData = axios.get('/api/days');
	const appointmentsData = axios.get('/api/appointments');

	useEffect(() => {
		Promise.all([daysData, appointmentsData])
			// .then((response) =>
			// 	console.log(Object.values(response[1].data))
			// );
			.then((all) => {
				setState((prev) => ({
					...prev,
					days: all[0].data,
					appointments: all[1].data,
				}));
			});
	}, []);

	console.log('Application.js > today:', state.day);

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
				{getAppointmentsForDay(state, state.day).map((appointment) => (
					<Appointment key={appointment.id} {...appointment} />
				))}
				{/* {appointments.map((appointment) => (
					<Appointment key={appointment.id} {...appointment} />
				))} */}
				<Appointment key={'last'} time={'5PM'} />
			</section>
		</main>
	);
}

export default Application;
