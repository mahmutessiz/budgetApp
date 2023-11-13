import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

export default async function useIncomeTransactions(userId) {
  let incomeTransactions = ref([])
  let error = ref([])

  try {
    const currentYear = new Date().getFullYear()

    let { data, err } = await supabase
      .from('income_transactions')
      .select('id, income, date')
      .eq('user_id', userId)
      .gte('date', `${currentYear}-01-01T00:00:00`)
      .lte('date', `${currentYear}-12-31T23:59:59`)
      .order('date', { ascending: false })

    if (err) throw err

    incomeTransactions.value = data
  } catch (err) {
    error.value = err.message
  }

  return { incomeTransactions, error }
}

export { useIncomeTransactions }
