import moment from 'moment'

export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

export const formatDate= (date)=>{
    return moment(date).format('DD MMM YYYY')
}