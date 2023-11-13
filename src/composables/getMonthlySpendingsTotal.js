import { supabase } from '../lib/supabaseClient'

async function useGetSpendings(user_id) {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1 // JavaScript months are 0-indexed.

  // Ensure the month is two digits
  const twoDigitMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth

  // Get the last day of the month
  const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate()

  let { data, error } = await supabase
    .from('transactions')
    .select('amount')
    .eq('user_id', user_id)
    .gte('date', `${currentYear}-${twoDigitMonth}-01T00:00:00`)
    .lte('date', `${currentYear}-${twoDigitMonth}-${lastDayOfMonth}T23:59:59`)

  if (error) {
    console.error('Error fetching transactions: ', error)
    return
  }

  let totalSpending = data.reduce((total, transaction) => total + parseFloat(transaction.amount), 0)

  return totalSpending
}

export { useGetSpendings }
