import { supabase } from '../lib/supabaseClient'
import { useRoute } from 'vue-router'

export default async function getTransactions(array) {
  const route = useRoute()
  const userId = route.query.user

  const { data } = await supabase
    .from('transactions')
    .select()
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(10)

  array.value = data
}

/**
 * The function `getMonthlyTotals` retrieves monthly totals of transactions for a specific user in the
 * current year.
 * @returns an object containing the monthly totals for each month of the current year. The object has
 * keys representing the month names (e.g., "January", "February") and values representing the total
 * amount for each month.
 * This function being used in charts
 */
async function getMonthlyTotals() {
  const route = useRoute()
  const userId = route.query.user

  const currentYear = new Date().getFullYear()

  const { data } = await supabase
    .from('transactions')
    .select('amount, date')
    .eq('user_id', userId)
    .gte('date', `${currentYear}-01-01T00:00:00`)
    .lte('date', `${currentYear}-12-31T23:59:59`)

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
    let transactionDate = new Date(transaction.date)
    let month = transactionDate.getMonth()
    let year = transactionDate.getFullYear()

    if (year === currentYear) {
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
    }
  })

  return monthlyTotals
}

/**
 * The function `getCategoryTotals` retrieves the total amounts for each category of transactions for a
 * specific user in the current year.
 * @returns an object called `categoryTotals` which contains two arrays: `categories` and
 * `totalAmounts`.
 */
async function getCategoryTotals() {
  const route = useRoute()
  const userId = route.query.user

  const currentYear = new Date().getFullYear()

  const { data } = await supabase
    .from('transactions')
    .select('amount, category_name')
    .eq('user_id', userId)
    .gte('date', `${currentYear}-01-01T00:00:00`)
    .lte('date', `${currentYear}-12-31T23:59:59`)

  let categoryTotals = { categories: [], totalAmounts: [] }
  let categoryIndex = {}

  data.forEach((transaction) => {
    let categoryName = transaction.category_name

    if (categoryIndex[categoryName] !== undefined) {
      categoryTotals.totalAmounts[categoryIndex[categoryName]] += transaction.amount
    } else {
      categoryIndex[categoryName] = categoryTotals.categories.length
      categoryTotals.categories.push(categoryName)
      categoryTotals.totalAmounts.push(transaction.amount)
    }
  })

  return categoryTotals
}

export { getTransactions, getMonthlyTotals, getCategoryTotals }
