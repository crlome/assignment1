import { useState } from 'react';

export const TransactionActions = ({ customer_history, setCustomerHistory, customers }) => {
	const [selected_customer, setSelectedCustomer] = useState({});
	const [total, setTotal] = useState(0);
	
	const onChangeTotal = (e) => {
		const new_total = parseFloat(e.target.value);
		
		if(new_total >= 0) {
			setTotal(new_total);
		}
		else {
			setTotal(0);
		}
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
			alert('You have to select a customer');
			return
		}
		
		if(total <= 0) {
			alert('The Total $ must be greater than 0');
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
		alert('Transaction saved')
	}

	return {
		/* state */
		selected_customer,
		setSelectedCustomer,
		total,
		setTotal,
		/* actions */
		onChangeTotal,
		onChangeCustomer,
		onClickCompleteTransaction,
	}
}

export const TransactionUI = ({ onChangeTotal, onChangeCustomer, onClickCompleteTransaction, selected_customer, total, customers }) => {
	return (
		<>
			<p>
				Customer:
				<select value={selected_customer?.id} onChange={onChangeCustomer}>
					<option value={undefined}>Select a customer...</option>
					{
						customers.map(customer => <option key={customer.id} value={customer.id}>{customer.name}</option>)
					}
				</select>
			</p>
			
			<label>
				Total $:
				<input type="number" value={total} onChange={onChangeTotal} />
			</label>
			
			<br /><br />
			<button onClick={onClickCompleteTransaction}>
				Save Transaction
			</button>
		</>
	)
}

function Transaction({ customer_history, setCustomerHistory, customers }) {
	const { onChangeTotal, onChangeCustomer, onClickCompleteTransaction, selected_customer, total } = TransactionActions({ customer_history, setCustomerHistory, customers });
	
	return <TransactionUI
		onChangeTotal={onChangeTotal}
		onChangeCustomer={onChangeCustomer}
		onClickCompleteTransaction={onClickCompleteTransaction}
		selected_customer={selected_customer}
		total={total}
		customers={customers}
	/>
}

export default Transaction
