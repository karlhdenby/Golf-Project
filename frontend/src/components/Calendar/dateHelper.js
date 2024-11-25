export const dateFormat = date => {
    date = date.split("T")
    let cal = date[0] // YYYY MM DD

    let parts = cal.split('-') // [YYYY, MM, DD]
    let month = parts[1]
    let day = parts[2]

    let time = date[1]

    let times = time.split(":")
    let hour = times[0]
    let min = times[1]

    let am = (hour < 12)


    
    return `${month}/${day} ${hour % 12}:${min}${am ? "am" : "pm"}`
}