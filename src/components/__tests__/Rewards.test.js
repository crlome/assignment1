import React from 'react'
import { render, fireEvent, waitFor, screen, mount } from '@testing-library/react';
import { getRoles } from '@testing-library/dom';
import '@testing-library/jest-dom'

import transactions_json from '../../api/transactions.json'
import Rewards from '../Rewards';

const BASE_CUSTOMER_ID = '62643b9ace974d7b6e6acfdc';

describe('Rewards Component Rendering', () => {
	const transactions = { ...transactions_json };

	it('render rewards table', () => {
		render(
			<Rewards 
				customer_history={transactions}
			/>
		);

		const buttonElement = screen.getByText('Calculate Rewards');
		fireEvent.click(buttonElement);

		const customerElement = screen.getByRole(`table:${BASE_CUSTOMER_ID}`);

		expect(customerElement).toBeInTheDocument();
	});
});