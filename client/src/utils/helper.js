export const handleGetUser = () => {
    const localStorageData = JSON.parse(localStorage.getItem("user")) || {}
    return localStorageData
}


export const handleTruncate = (text, length) => {
    return `${text?.substring(0, length)}...`
}