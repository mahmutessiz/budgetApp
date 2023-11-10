import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

export default async function useIncomeTransactions(userId) {
  let incomeTransactions = ref([])
  let error = ref([])

  try {
    let { data, err } = await supabase
      .from('income_transactions')
      .select('id, income, date')
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (err) throw err

    incomeTransactions.value = data
  } catch (err) {
    error.value = err.message
  }

  return { incomeTransactions, error }
}
export { useIncomeTransactions }
