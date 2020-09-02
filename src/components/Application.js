import React, { useState } from 'react';

import 'components/Application.scss';
import DayList from 'components/DayList';

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
		time: '4pm',
	},
	{
		id: 4,
		time: '2pm',
		interview: {
			student: 'James Smith',
			interviewer: {
				id: 3,
				name: 'Mildred Nazir',
				avatar: 'https://i.imgur.com/T2WwVfS.png',
			},
		},
	},
	{
		id: 5,
		time: '3pm',
	},
];

function Application(props) {
	const [today, setToday] = useState('Monday');
	console.log(today);

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
				{/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
			</section>
		</main>
	);
}

export default Application;
