const BASE_URL = 'https://restcountries.com/v3.1'

// Fetch all countries (limited fields to improve performance)
export const fetchAllCountries = async () => {
  const fields = ['name','flags','population','region','capital','cca3'].join(',')
  const res = await fetch(`${BASE_URL}/all?fields=${fields}`)
  if (!res.ok) throw new Error('Failed to fetch countries')
  return res.json()
}

// Fetch a single country by its code 
export const fetchCountryByCode = async (code) => {
  const res = await fetch(`${BASE_URL}/alpha/${code}`)
  if (!res.ok) throw new Error('Failed to fetch country')
  return res.json() // returns an array with one element
}

// Fetch countries by region
export const fetchCountriesByRegion = async (region) => {
  const fields = ['name','flags','population','region','capital','cca3'].join(',')
  const res = await fetch(`${BASE_URL}/region/${region}?fields=${fields}`)
  if (!res.ok) throw new Error('Failed to fetch countries by region')
  return res.json()
}

// Fetch countries by language
export const fetchCountriesByLanguage = async (lang) => {
  const fields = ['name','flags','population','region','capital','cca3'].join(',')
  const res = await fetch(`${BASE_URL}/lang/${lang}?fields=${fields}`)
  if (!res.ok) throw new Error('Failed to fetch countries by language')
  return res.json()
}

// Fetch independent countries
export const fetchIndependentCountries = async () => {
  const fields = ['name','flags','population','region','capital','cca3'].join(',')
  const res = await fetch(`${BASE_URL}/independent?status=true&fields=${fields}`)
  if (!res.ok) throw new Error('Failed to fetch independent countries')
  return res.json()
}

// Fetch countries by name (search)
export const fetchCountryByName = async (name) => {
  const fields = ['name','flags','population','region','capital','cca3'].join(',')
  const res = await fetch(`${BASE_URL}/name/${name}?fields=${fields}`)
  if (!res.ok) {
    if (res.status === 404) return [] // no match found, return empty array
    throw new Error('Failed to fetch country by name')
  }
  return res.json()
}
