import { supabase } from '../lib/supabaseClient'

async function useAddIncome(user_id, amount) {
  const { error } = await supabase
    .from('income_transactions')
    .insert({ user_id: user_id, income: amount, date: new Date() })

  if (error) {
    console.error('Error adding income: ', error)
  } else {
    console.log('Income added successfully!')
  }
}
export { useAddIncome }
