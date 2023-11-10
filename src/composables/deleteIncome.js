import { supabase } from '../lib/supabaseClient'
export default async function useDeleteIncome(id, user_id) {
  try {
    let { error: deleteError } = await supabase
      .from('income_transactions')
      .delete()
      .eq('user_id', user_id)
      .eq('id', id)

    if (deleteError) throw deleteError
  } catch (err) {
    console.log(err.message)
  }
}

export { useDeleteIncome }
