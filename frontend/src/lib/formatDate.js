const formatDate = (dateString) => {
  const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString('sv-SE', options).replace(',', '')
}

export default formatDate