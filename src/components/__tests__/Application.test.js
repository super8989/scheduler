import React from 'react';
import {
	render,
	cleanup,
	waitForElement,
	fireEvent,
	prettyDOM,
} from '@testing-library/react';
import Application from 'components/Application';

afterEach(cleanup);

it('defaults to Monday and changes the schedule when a new day is selected', () => {
	const { getByText } = render(<Application />);

	return waitForElement(() => getByText('Monday'))
		.then(() => {
			fireEvent.click(getByText('Tuesday'));
			expect(getByText('Leopold Silvers')).toBeInTheDocument();
		})
		.then(() => {
			fireEvent.click(getByText('Monday'));
			expect(getByText('Archie Cohen')).toBeInTheDocument();
		});
});
