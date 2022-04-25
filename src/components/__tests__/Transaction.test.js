import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import customer_json from '../../api/customers.json'
import Transaction from '../Transaction';

const mockedSetCustomerHistory = jest.fn();

const BASE_CUSTOMER_ID = '62643b9a06d21e10a0429012';

describe('Transaction Component Rendering', () => {
	const customer_history = {};
	const customers = [ ...customer_json ];

	it('no customer selected error', () => {
		render(
			<Transaction 
				customer_history={customer_history}
				setCustomerHistory={mockedSetCustomerHistory}
				customers={customers}
			/>
		);

		const buttonElement = screen.getByText('Save Transaction');
		fireEvent.click(buttonElement);
		const errorElement = screen.getByText('Error: You have to select a customer');

		expect(errorElement).toBeInTheDocument();
	});

	it('zero total error', () => {
		render(
			<Transaction 
				customer_history={customer_history}
				setCustomerHistory={mockedSetCustomerHistory}
				customers={customers}
			/>
		);

		const customerElement = screen.getByPlaceholderText('Select a customer...');
		fireEvent.change(customerElement, { target: { value: BASE_CUSTOMER_ID } });
		
		const buttonElement = screen.getByText('Save Transaction');
		fireEvent.click(buttonElement);
		const errorElement = screen.getByText('Error: The Total $ must be greater than 0');

		expect(errorElement).toBeInTheDocument();
	});

	it('transaction done', () => {
		render(
			<Transaction 
				customer_history={customer_history}
				setCustomerHistory={mockedSetCustomerHistory}
				customers={customers}
			/>
		);

		const customerElement = screen.getByPlaceholderText('Select a customer...');
		fireEvent.change(customerElement, { target: { value: BASE_CUSTOMER_ID } });

		const totalElement = screen.getByPlaceholderText('Total');
		fireEvent.change(totalElement, { target: { value: 120 } });
		
		const buttonElement = screen.getByText('Save Transaction');
		fireEvent.click(buttonElement);
		const messageElement = screen.getByText('Transaction saved');

		expect(messageElement).toBeInTheDocument();
	});
});