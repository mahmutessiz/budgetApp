import { supabase } from '../lib/supabaseClient'

async function useGetSpendings(user_id) {
  let { data, error } = await supabase.from('transactions').select('amount').eq('user_id', user_id)

  if (error) {
    console.error('Error fetching transactions: ', error)
    return
  }

  let totalSpending = data.reduce((total, transaction) => total + parseFloat(transaction.amount), 0)

  return totalSpending
}

export { useGetSpendings }
