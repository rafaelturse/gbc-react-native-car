export const generateRandomFutureDate = () => {
    const randomDays = Math.floor(Math.random() * 365) 
    const currentDate = new Date()
    const futureDate = new Date(currentDate.getTime() + randomDays * 24 * 60 * 60 * 1000)
    const formattedDate = futureDate.toLocaleDateString('en-US')
    return formattedDate
}