export const calculateBalances = (expenses) => {
    const balances = {};
  
    for (const exp of expenses) {
      const { amount, paid_by, shared_with, split_type, split_values } = exp;
      const n = shared_with.length;
  
      if (!balances[paid_by]) balances[paid_by] = 0;
  
      let shares = [];
  
      if (split_type === "equal") {
        const share = amount / n;
        shares = Array(n).fill(share);
      } else if (split_type === "exact") {
        shares = split_values;
      } else if (split_type === "percentage") {
        shares = split_values.map(p => (p / 100) * amount);
      }
  
      for (let i = 0; i < n; i++) {
        const person = shared_with[i];
        if (!balances[person]) balances[person] = 0;
        balances[person] -= shares[i];
      }
  
      balances[paid_by] += amount;
    }
  
    // Round to 2 decimals
    for (const person in balances) {
      balances[person] = Math.round(balances[person] * 100) / 100;
    }
  
    return balances;
  };
  
  export const simplifyDebts = (balances) => {
    const creditors = [];
    const debtors = [];
  
    for (const person in balances) {
      const amount = balances[person];
      if (amount > 0) creditors.push({ person, amount });
      else if (amount < 0) debtors.push({ person, amount: -amount });
    }
  
    creditors.sort((a, b) => b.amount - a.amount);
    debtors.sort((a, b) => b.amount - a.amount);
  
    const settlements = [];
  
    while (creditors.length && debtors.length) {
      const credit = creditors[0];
      const debit = debtors[0];
  
      const settled = Math.min(credit.amount, debit.amount);
      settlements.push({
        from: debit.person,
        to: credit.person,
        amount: Math.round(settled * 100) / 100
      });
  
      credit.amount -= settled;
      debit.amount -= settled;
  
      if (credit.amount === 0) creditors.shift();
      if (debit.amount === 0) debtors.shift();
    }
  
    return settlements;
  };
  