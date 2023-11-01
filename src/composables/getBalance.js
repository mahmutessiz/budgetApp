import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

export default function useUserBalance() {
  const balance = ref(null)
  const error = ref(null)

  const getUserBalance = async () => {
    // Get the current user
    const { data: userData } = await supabase.auth.getUser()

    if (userData) {
      // Fetch the user's balance from the 'user_balance' table
      const { data: balanceData, error: fetchError } = await supabase
        .from('user_balance')
        .select('total_balance')
        .eq('user_id', userData.user.id)

      if (fetchError) {
        error.value = fetchError
      } else if (balanceData && balanceData.length > 0) {
        balance.value = balanceData[0].total_balance
      } else {
        console.log('No balance found for user.')
      }
    } else {
      console.log('No user is currently logged in.')
    }
  }

  return { balance, error, getUserBalance }
}

export { useUserBalance }
