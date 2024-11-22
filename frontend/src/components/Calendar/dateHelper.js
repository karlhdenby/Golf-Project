export const dateFormat = date => {
    date = date.split("T")
    let cal = date[0] // YYYY MM DD

    let parts = cal.split('-') // [YYYY, MM, DD]
    let year = parts[0]
    let month = parts[1]
    let day = parts[2]

    let time = date[1]

    let times = time.split(":")
    let hour = times[0]
    let min = times[1]

    let am = (hour < 12)

    const months = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
      };
    
    return `${month}/${day} ${hour % 12}:${min}${am ? "am" : "pm"}`
}