import { useState } from 'react';

function Rewards({ customer_history }) {
	const [rewards, setRewards] = useState([]);
	
	const onClickCalculateRewards = () => {
		const new_rewards = [];
		
		for(const customer in customer_history) {
			const history = customer_history[customer];

			const reward = {
				customer_id: history.customer.id,
				customer: history.customer.name,
				months: [],
			};
			
			for(const month in history.months) {
				const total = history.months[month];
				
				let rewards_over_100 = 0;
				if(total > 100) {
					rewards_over_100 = (total - 100) * 2;
				}
				
				let rewards_over_50 = 0;
				if(total >= 50) {
					rewards_over_50 = 50;
				}
				
				reward.months.push({ month: month, total: rewards_over_100 + rewards_over_50 });
			}
			
			new_rewards.push(reward);
		}
		
		setRewards(new_rewards);
	}

	return (
		<>
			<br /><br />
			<button onClick={onClickCalculateRewards}>
				Calculate Rewards
			</button>

			{
				rewards.map((reward, id_reward) => 
					<table key={id_reward} role={`table:${reward.customer_id}`}>
						<thead>
							<tr>
								<th colSpan="2">Customer: {reward.customer}</th>
							</tr>
							<tr>
								<th>Month</th>
								<th>Points</th>
							</tr>
						</thead>
						<tbody>
							{
								reward.months.map((month, id_month) => 
									<tr key={`${id_reward}-${id_month}`}>
										<td>{month.month}</td>
										<td>{month.total}</td>
									</tr>
								)
							}
						</tbody>
					</table>
				)
			}
		</>
	)
}

export default Rewards
