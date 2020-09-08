import React from 'react';
import {
	render,
	cleanup,
	waitForElement,
	fireEvent,
	prettyDOM,
	getByText,
	getAllByTestId,
	getByAltText,
	getByPlaceholderText,
	queryByText,
} from '@testing-library/react';
import Application from 'components/Application';

// ByLabelText, ByText, ByDisplayValue, ByTitle, ByRole

afterEach(cleanup);

describe('Application', () => {
	it('defaults to Monday and changes the schedule when a new day is selected', () => {
		const { getByText } = render(<Application />);

		return waitForElement(() => getByText('Monday')).then(() => {
			fireEvent.click(getByText('Tuesday'));
			expect(getByText('Leopold Silvers')).toBeInTheDocument();
		});
	});

	// Using async await instead of promise
	// it('defaults to Monday and changes the schedule when a new day is selected', async () => {
	// 	const { getByText } = render(<Application />);

	// 	await waitForElement(() => getByText('Monday'));

	// 	fireEvent.click(getByText('Tuesday'));
	// 	expect(getByText('Leopold Silvers')).toBeInTheDocument();
	// });

	it('loads data, books an interview and reduces the spots remaining for Monday by 1', async () => {
		const { container, debug } = render(<Application />);

		await waitForElement(() => getAllByTestId(container, 'appointment'));

		const appointments = getAllByTestId(container, 'appointment');
		const appointment = appointments[0];

		fireEvent.click(getByAltText(appointment, 'Add'));

		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: 'Lydia Miller-Jones' },
		});

		fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
		fireEvent.click(getByText(appointment, 'Save'));

		expect(getByText(appointment, 'Saving')).toBeInTheDocument();
		// debug();

		await waitForElement(() => queryByText(appointment, 'Lydia Miller-Jones'));

		expect(getByText(appointment, 'Lydia Miller-Jones')).toBeInTheDocument();

		const day = getAllByTestId(container, 'day').find((day) =>
			queryByText(container, 'Monday')
		);

		expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();

		// console.log(prettyDOM(day));
	});
});
