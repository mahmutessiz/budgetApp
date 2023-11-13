import { supabase } from '../lib/supabaseClient'
/**
 * The function useDeleteIncome deletes an income transaction from the 'income_transactions' table in a
 * Supabase database based on the provided id and user_id.
 * @param id - The `id` parameter represents the unique identifier of the income transaction that you
 * want to delete.
 * @param user_id - The `user_id` parameter is the ID of the user whose income transaction you want to
 * delete.
 */
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
