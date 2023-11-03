import { supabase } from '../lib/supabaseClient'

async function useAddTransactions(user_id, category_name, amount) {
  const { error } = await supabase
    .from('transactions')
    .insert({ user_id: user_id, category_name: category_name, amount: amount, date: new Date() })

  if (error) {
    console.error('Error adding transaction: ', error)
  } else {
    console.log('Transaction added successfully!')
  }
}
export { useAddTransactions }
