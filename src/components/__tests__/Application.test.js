import React from 'react';
import axios from 'axios';
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
	getByTestId,
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

	it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
		// 1. Render the Application.
		const { container, debug } = render(<Application />);

		// 2. Wait until the text "Archie Cohen" is displayed.
		await waitForElement(() => getByText(container, 'Archie Cohen'));

		// 3. Click the "Delete" button on the booked appointment.
		const appointment = getAllByTestId(
			container,
			'appointment'
		).find((appointment) => queryByText(appointment, 'Archie Cohen'));

		fireEvent.click(getByAltText(appointment, 'Delete'));
		// debug();

		// 4. Check that the confirmation message is shown.
		expect(getByText(appointment, /Delete your booking?/i)).toBeInTheDocument();

		// 5. Click the "Confirm" button on the confirmation.
		fireEvent.click(queryByText(appointment, 'Confirm'));

		// 6. Check that the element with the text "Deleting" is displayed.
		expect(getByText(appointment, /deleting/i)).toBeInTheDocument();

		// 7. Wait until the element with the "Add" button is displayed.
		await waitForElement(() => getByAltText(appointment, 'Add'));

		// 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
		const day = getAllByTestId(container, 'day').find((day) =>
			queryByText(container, 'Monday')
		);

		// console.log(prettyDOM(day));

		expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
	});

	it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
		// 1. Render the Application.
		const { container, debug } = render(<Application />);

		// 2. Wait until the text "Archie Cohen" is displayed.
		await waitForElement(() => getByText(container, 'Archie Cohen'));

		// 3. Click the "Edit" button on the booked appointment.
		const appointment = getAllByTestId(
			container,
			'appointment'
		).find((appointment) => queryByText(appointment, 'Archie Cohen'));
		// console.log(prettyDOM(appointment));

		fireEvent.click(getByAltText(appointment, 'Edit'));

		// 4. Check that the form is shown.
		expect(
			getByPlaceholderText(appointment, /enter student name/i)
		).toBeInTheDocument();

		// 5. Change the value of the name.
		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: 'Sam Jackson' },
		});

		// 6. Change the interviewer.
		fireEvent.click(getByAltText(appointment, 'Tori Malcolm'));

		// 5. Click the "Save" button.
		fireEvent.click(getByText(appointment, 'Save'));

		// 6. Check that the element with the text "Saving" is displayed.
		expect(getByText(appointment, 'Saving')).toBeInTheDocument();

		// 7. Check that the element with the updated name is displayed
		await waitForElement(() => queryByText(appointment, 'Sam Jackson'));

		expect(getByText(appointment, 'Sam Jackson')).toBeInTheDocument();

		// 8. Check that the DayListItem with the text "Monday" has the text "1 spots remaining".
		const day = getAllByTestId(container, 'day').find((day) =>
			queryByText(container, 'Monday')
		);

		expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
	});

	it('shows the save error when failing to save an appointment', async () => {
		axios.put.mockRejectedValueOnce();

		const { container, debug } = render(<Application />);

		await waitForElement(() => getAllByTestId(container, 'appointment'));

		const appointment = getAllByTestId(container, 'appointment')[0];

		fireEvent.click(getByAltText(appointment, 'Add'));

		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: 'Iron Man' },
		});

		fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

		fireEvent.click(getByText(appointment, 'Save'));

		expect(getByText(appointment, 'Saving')).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, 'Error'));

		expect(getByText(appointment, 'Error')).toBeInTheDocument();

		fireEvent.click(getByAltText(appointment, 'Close'));

		expect(getByAltText(appointment, 'Add')).toBeInTheDocument();
	});

	it('shows the delete error when failing to deleting an appointment', async () => {
		axios.delete.mockRejectedValueOnce();

		const { container, debug } = render(<Application />);

		await waitForElement(() => getByText(container, 'Archie Cohen'));

		const appointment = getAllByTestId(
			container,
			'appointment'
		).find((appointment) => queryByText(appointment, 'Archie Cohen'));

		fireEvent.click(getByAltText(appointment, 'Delete'));

		expect(getByText(appointment, 'Delete your booking?')).toBeInTheDocument();

		fireEvent.click(getByText(appointment, 'Confirm'));

		expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, 'Error'));

		expect(getByText(appointment, 'Error')).toBeInTheDocument();

		fireEvent.click(getByAltText(appointment, 'Close'));

		expect(getByText(appointment, 'Archie Cohen')).toBeInTheDocument();
	});
});
