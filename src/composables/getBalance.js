// getBalance.js
/**
 * The `useUserBalance` function is a Vue composition function that retrieves a user's balance from a
 * Supabase database.
 * @returns The function `useUserBalance` returns an object with three properties: `balance`, `error`,
 * and `getUserBalance`.
 */
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

export default function useUserBalance() {
  const balance = ref(null)
  const error = ref(null)

  const getUserBalance = async (userId) => {
    if (userId) {
      const { data: balanceData, error: fetchError } = await supabase
        .from('user_balance')
        .select('total_balance')
        .eq('user_id', userId)

      if (fetchError) {
        error.value = fetchError
      } else if (balanceData && balanceData.length > 0) {
        balance.value = balanceData[0].total_balance
      } else {
        console.log('No balance found for user.')
      }
    } else {
      console.log('No user id provided.')
    }
  }

  return { balance, error, getUserBalance }
}
export { useUserBalance }
