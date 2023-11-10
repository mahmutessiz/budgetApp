import { supabase } from '../lib/supabaseClient'
export default async function useDeleteRow(id, user_id) {
  try {
    let { error: deleteError } = await supabase
      .from('transactions')
      .delete()
      .eq('user_id', user_id)
      .eq('transaction_id', id)

    if (deleteError) throw deleteError
  } catch (err) {
    console.log(err.message)
  }
}

export { useDeleteRow }
