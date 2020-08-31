import React from 'react';
import 'components/DayListItem.scss';

const classNames = require('classnames');

const formatSpots = (spots) => {
	if (!spots) return 'no spots';
	if (spots === 1) return '1 spot';
	else return `${spots} spots`;
};

export default function DayListItem(props) {
	const dayClass = classNames('day-list__item', {
		'day-list__item--selected': props.selected,
		'day-list__item--full': props.spots === 0,
	});

	return (
		<li className={dayClass} onClick={() => props.setDay(props.name)}>
			<h2>{props.name}</h2>
			<h3>{formatSpots(props.spots)} remaining</h3>
		</li>
	);
}
