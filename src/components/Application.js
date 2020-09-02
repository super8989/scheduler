import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DayList from 'components/DayList';
import Appointment from 'components/Appointment';

import 'components/Application.scss';

const days = [
	{
		id: 1,
		name: 'Monday',
		spots: 2,
	},
	{
		id: 2,
		name: 'Tuesday',
		spots: 5,
	},
	{
		id: 3,
		name: 'Wednesday',
		spots: 0,
	},
];

const appointments = [
	{
		id: 1,
		time: '12pm',
	},
	{
		id: 2,
		time: '1pm',
		interview: {
			student: 'Lydia Miller-Jones',
			interviewer: {
				id: 1,
				name: 'Sylvia Palmer',
				avatar: 'https://i.imgur.com/LpaY82x.png',
			},
		},
	},
	{
		id: 3,
		time: '2pm',
	},
	{
		id: 4,
		time: '3pm',
		interview: {
			student: 'Archie Cohen',
			interviewer: {
				id: 2,
				name: 'Tori Malcom',
				avatar: 'https://i.imgur.com/Nmx0Qxo.png',
			},
		},
	},
	{
		id: 5,
		time: '4pm',
		interview: {
			student: 'Maria Boucher',
			interviewer: {
				id: 3,
				name: 'Mildren Nazir',
				avatar: 'https://i.imgur.com/T2WwVfS.png',
			},
		},
	},
];

function Application(props) {
	const [today, setToday] = useState('Monday');
	console.log('Application.js > today:', today);

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
					<DayList days={days} day={today} setDay={setToday} />
				</nav>
				<img
					className='sidebar__lhl sidebar--centered'
					src='images/lhl.png'
					alt='Lighthouse Labs'
				/>
			</section>
			<section className='schedule'>
				{appointments.map((appointment) => (
					<Appointment key={appointment.id} {...appointment} />
				))}
				<Appointment key={'last'} time={'5PM'} />
			</section>
		</main>
	);
}

export default Application;
