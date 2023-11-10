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

  array.value = data
}

async function getMonthlyTotals() {
  const route = useRoute()
  const userId = route.query.user

  const { data } = await supabase.from('transactions').select('amount, date').eq('user_id', userId)

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

  const currentYear = new Date().getFullYear()

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

async function getCategoryTotals() {
  const route = useRoute()
  const userId = route.query.user

  const { data } = await supabase
    .from('transactions')
    .select('amount, category_name')
    .eq('user_id', userId)

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
