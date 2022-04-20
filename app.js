import { useState } from 'react';

const App = () => {
  const customer_list = ['a', 'b', 'c'];
  
  const [selected_customer, setSelectedCustomer] = useState(customer_list[0]);
  const [total, setTotal] = useState(0);
  const [customer_history, setCustomerHistory] = useState({});
  const [rewards, setRewards] = useState([]);
  
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
    setSelectedCustomer(e.target.value);
  }

  const onClickCompleteTransaction = () => {
    if(total <= 0) {
      alert('The Total $ must be greater than 0');
      return
    }
    
    const date = new Date();
    const current_year_month = `${date.getMonth()}-${date.getFullYear()}`;
    
    const new_customer_history = { ...customer_history };
    if(!new_customer_history[selected_customer]) {
      new_customer_history[selected_customer] = {
        months: {},
      };
    }
    
    if(!new_customer_history[selected_customer].months[current_year_month]) {
      new_customer_history[selected_customer].months[current_year_month] = 0;
    }
    
    new_customer_history[selected_customer].months[current_year_month] += total;
    
    setCustomerHistory(new_customer_history);
    setTotal(0);
    alert('Transaction saved')
  }
  
  const onClickCalculateRewards = () => {
    debugger
    const new_rewards = [];
    
    for(const customer in customer_history) {
      const reward = {
        customer: customer,
        months: [],
      };
      const history = customer_history[customer];
      
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
    <div>
      <p>
        Customer:
        <select value={selected_customer} onChange={onChangeCustomer}>
          {
            customer_list.map((customer, idx) => <option key={idx} value={customer}>{customer}</option>)
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
      
      <br /><br />
      <button onClick={onClickCalculateRewards}>
        Calculate Rewards
      </button>
      
      {
        rewards.map(reward => 
            <table>
              <thead>
                <tr>
                  <th colspan="2">Customer: {reward.customer}</th>
                </tr>
                <tr>
                  <th>Month</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {
                  reward.months.map(month => 
                    <tr>
                      <td>{month.month}</td>
                      <td>{month.total}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
        )
      }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
