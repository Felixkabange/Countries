const FAVORITES_KEY = 'favoriteCountries'

export const getFavorites = () => {
  const stored = localStorage.getItem(FAVORITES_KEY)
  return stored ? JSON.parse(stored) : []
}

export const addFavorite = (cca3) => {
  const favorites = getFavorites()
  if (!favorites.includes(cca3)) {
    favorites.push(cca3)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }
}

export const removeFavorite = (cca3) => {
  const favorites = getFavorites().filter(code => code !== cca3)
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
}

export const isFavorite = (cca3) => {
  return getFavorites().includes(cca3)
}
