import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

export default function useUserIncome() {
  const balance = ref(null)
  const error = ref(null)

  /**
   * The function `getUserBalance` retrieves the monthly income data for a given user from a database
   * and calculates the total monthly income.
   * @param userId - The `userId` parameter is the unique identifier of the user for whom we want to
   * retrieve the balance.
   * @returns an object that contains the following properties: `balance`, `error`, and
   * `getUserBalance`.
   */
  const getUserBalance = async (userId) => {
    if (userId) {
      const { data: balanceData, error: fetchError } = await supabase
        .from('income_transactions')
        .select('income, date')
        .eq('user_id', userId)

      if (fetchError) {
        error.value = fetchError
      } else if (balanceData && balanceData.length > 0) {
        // Calculate total monthly income
        const monthlyIncome = balanceData.reduce((acc, curr) => {
          const month = new Date(curr.date).getMonth()
          if (!acc[month]) {
            acc[month] = 0
          }
          acc[month] += curr.income
          return acc
        }, {})

        balance.value = monthlyIncome
        return monthlyIncome // return the monthly income data
      }
    }
  }

  return { balance, error, getUserBalance }
}
export { useUserIncome }
