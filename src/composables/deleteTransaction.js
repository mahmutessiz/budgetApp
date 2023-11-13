import { supabase } from '../lib/supabaseClient'
/**
 * The function `useDeleteRow` deletes a row from the "transactions" table in a Supabase database based
 * on the provided `id` and `user_id`.
 * @param id - The `id` parameter represents the transaction ID of the row that needs to be deleted
 * from the "transactions" table.
 * @param user_id - The `user_id` parameter is the ID of the user whose transaction you want to delete.
 */
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
