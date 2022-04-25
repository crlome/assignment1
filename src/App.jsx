import { useState, useEffect } from 'react';
import Rewards from './components/Rewards';
import Transaction from './components/Transaction';

const api = {
	customers: 'http://localhost:3000/src/api/customers.json',
	transactions: 'http://localhost:3000/src/api/transactions.json',
}

function App() {
	const [customer_history, setCustomerHistory] = useState({});
	const [customers, setCustomers] = useState([]);

	const getPayloadFromApi = async () => {
		try {
			const payload_promises = [fetch(api.customers), fetch(api.transactions)]
			const [result_customers, result_transactions] = await Promise.all(payload_promises);

			const [customers, transactions] = await Promise.all([result_customers.json(), result_transactions.json()]);

			return {
				customers,
				transactions,
			}
		}
		catch(ex) {
			throw ex;
		}
	}

	useEffect(() => {
		(async () => {
			try {
				const { customers, transactions } = await getPayloadFromApi();

				setCustomers(customers);
				setCustomerHistory(transactions);
			}
			catch(ex) {
				alert('Error on API: ', ex)
			}
		})();
	}, []);
	
	return (
		<div>
			<Transaction customer_history={customer_history} setCustomerHistory={setCustomerHistory} customers={customers} />
			
			<Rewards customer_history={customer_history}/>
		</div>
	)
}

export default App
