export const getFavorites = () => {
    const favorites = localStorage.getItem("favorites")
    return favorites ? JSON.parse(favorites) : {};
}

export const isFavorite = (stockNumber: string | number) => {
    const storedFavorite: { [key: string]: boolean } = getFavorites();
    return storedFavorite[stockNumber]
}

export const toggleFavorite = (stockNumber: string | number) => {
    const storedFavorite: { [key: string]: boolean } = getFavorites();
    storedFavorite[stockNumber] ? delete storedFavorite[stockNumber] : storedFavorite[stockNumber] = true
    localStorage.setItem("favorites", JSON.stringify(storedFavorite))
}