export const monthMaker = () => {
const date = new Date().toString().split(" ");

  const daysInMonth = {
    Jan: 31,
    Feb: 28,
    Mar: 31,
    Apr: 30,
    May: 31,
    Jun: 30,
    Jul: 31,
    Aug: 31,
    Sep: 30,
    Oct: 31,
    Nov: 30,
    Dec: 31,
  };

  const daysInWeek = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7,
  };

  const reversedDaysInWeek = {
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
    7: "Sun"
  };



  const numDays = daysInMonth[date[1]];
  const dayNum = daysInWeek[date[0]];

  const mapDates = (numDays, dayNum) => {
    const firstDay = 7 - (((7 - dayNum) + parseInt(date[2]) % 7) - 1)
    return firstDay
  }

  const month = {}
  let num = 0
  let dayOfWeek = mapDates(numDays, dayNum)
  while (num < numDays) {
    month[num + 1] = reversedDaysInWeek[dayOfWeek]
    if (dayOfWeek + 1 === 8) dayOfWeek = 0
    dayOfWeek++
    num++
  }

  return month
}

export const weekMaker = () => {
      const daysInWeek = {
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6,
        Sun: 7,
      };
    
    let month = monthMaker()
    let monthLength = Object.values(month).length
    let day = month[monthLength]
    let newNum = (daysInWeek[day])
    let num = monthLength
    let array = []
    while (newNum > 0) {
        array.push(num)
        num--
        newNum--
    }
    let monthArray = [array.reverse()]
    while (num > 0) {
        let arr = []
        for(let a = 0; a < 7; a ++) {
            if (month[num]) arr.push(num)
            num --
        }
        monthArray.push(arr.reverse())
    }
    let final = monthArray.reverse()
    return final
}