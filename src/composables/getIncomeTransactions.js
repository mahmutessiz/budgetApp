import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

/**
 * This function retrieves income transactions for a specific user within the current year from a
 * database and returns the transactions and any error that occurred.
 * @param userId - The `userId` parameter is the unique identifier of the user for whom we want to
 * fetch income transactions.
 * @returns an object with two properties: "incomeTransactions" and "error". The "incomeTransactions"
 * property is an array of income transactions, and the "error" property is an array that stores any
 * error messages encountered during the execution of the function.
 */
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
      .limit(10)

    if (err) throw err

    incomeTransactions.value = data
  } catch (err) {
    error.value = err.message
  }

  return { incomeTransactions, error }
}

export { useIncomeTransactions }
