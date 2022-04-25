import { useState, useEffect } from 'react';

function Transaction({ customer_history, setCustomerHistory, customers }) {
	const [selected_customer, setSelectedCustomer] = useState({});
	const [total, setTotal] = useState(0);
	const [message, setMessage] = useState('');

	const onChangeTotal = (e) => {
		const new_total = parseFloat(e.target.value);
		
		if(new_total >= 0) {
			setTotal(new_total);
		}
		else {
			setTotal(0);
		}
	}

	const onFocustotal = () => {
		setMessage('');
	}
	
	const onChangeCustomer = (e) => {
		const customer_id = e.target.value;
		let customer = {};

		if(customer_id) {
			const index = customers.findIndex(customer => customer.id == customer_id);

			if(index >= 0) {
				customer = customers[index];
			}
		}

		setSelectedCustomer(customer);
	}

	const onClickCompleteTransaction = () => {
		if(!selected_customer?.id) {
			setMessage('Error: You have to select a customer');
			return
		}
		
		if(total <= 0) {
			setMessage('Error: The Total $ must be greater than 0');
			return
		}
		
		const date = new Date();
		const current_year_month = `${date.getMonth()}-${date.getFullYear()}`;
		
		const new_customer_history = { ...customer_history };
		if(!new_customer_history[selected_customer.id]) {
			new_customer_history[selected_customer.id] = {
				customer: selected_customer,
				months: {},
			};
		}
		
		if(!new_customer_history[selected_customer.id].months[current_year_month]) {
			new_customer_history[selected_customer.id].months[current_year_month] = 0;
		}
		
		new_customer_history[selected_customer.id].months[current_year_month] += total;
		
		setCustomerHistory(new_customer_history);
		setTotal(0);
		setMessage('Transaction saved')
	}
	
	return (
		<>
			<p>
				Customer:
				<select value={selected_customer?.id} onChange={onChangeCustomer} placeholder="Select a customer...">
					{
						customers.map(customer => <option key={customer.id} value={customer.id}>{customer.name}</option>)
					}
				</select>
			</p>
			
			<label>
				Total $:
				<input type="number" value={total} placeholder="Total" onChange={onChangeTotal} onFocus={onFocustotal} />
			</label>
			
			<br /><br />
			<button onClick={onClickCompleteTransaction}>
				Save Transaction
			</button>

			<br /><br />
			{
				(message || '').length > 0
				?
				<strong className='error'>{message}</strong>
				:
				null
			}
		</>
	)
}

export default Transaction
