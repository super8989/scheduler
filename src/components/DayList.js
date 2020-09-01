import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
	const { days } = props;

	return days.map((day) => (
		<DayListItem
			key={day.id}
			name={day.name}
			spots={day.spots}
			selected={day.name === props.day}
			setDay={props.setDay}
		/>
	));

	// const list = days.map((day) => {
	// 	const { id, name, spots } = day;

	// 	return (
	// 		<DayListItem
	// 			key={id}
	// 			name={name}
	// 			spots={spots}
	// 			selected={name === props.day}
	// 			setDay={props.setDay}
	// 		/>
	// 	);
	// });

	// return <ul>{list}</ul>;
}
