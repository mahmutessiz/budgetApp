import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

/**
 * The `useUserBalance` function is a JavaScript function that retrieves a user's balance from a
 * database and provides a reactive `balance` value, an `error` value, a `getUserBalance` function to
 * fetch the balance, and a `channelA` object for subscribing to database changes.
 * @returns The function `useUserBalance` returns an object with the following properties:
 */
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

  const channelA = supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public'
      },
      async (payload) => {
        await getUserBalance(payload.new.user_id)
      }
    )
    .subscribe()

  return { balance, error, getUserBalance, channelA }
}
export { useUserBalance }
