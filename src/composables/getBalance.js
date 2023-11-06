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
