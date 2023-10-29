import { supabase } from '../lib/supabaseClient'

export default async function getTransactions(array) {
  const { data } = await supabase.from('budget_app').select()
  array.value = data
}

async function getMonthlyTotals() {
  const { data } = await supabase.from('budget_app').select('amount, date')

  let monthlyTotals = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0
  }

  data.forEach((transaction) => {
    let month = new Date(transaction.date).getMonth()
    let monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    monthlyTotals[monthNames[month]] += transaction.amount
  })

  return monthlyTotals
}

export { getTransactions, getMonthlyTotals }
