export const monthMaker = (when = "now") => {
  const currentDate = new Date();
  const oneMonthFromNow = new Date(currentDate);
  oneMonthFromNow.setMonth(currentDate.getMonth() + 1);
  let date = [];
  if (when === "now") date = currentDate.toString().split(" ");
  else if (when === "next") date = oneMonthFromNow.toString().split(" ");

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
    7: "Sun",
  };

  const numDays = daysInMonth[date[1]];
  const dayNum = daysInWeek[date[0]];
  const today = date[2]

  const mapDates = (dayNum, today) => {
    let num = dayNum;
    let day = today;
    while (day > 1) {
      num--
      day--
      if (num === 0) num = 7
    }
    return num
  };

  const month = {};
  let num = 0;
  let dayOfWeek = mapDates(dayNum, today);
  while (num < numDays) {
    month[num + 1] = reversedDaysInWeek[dayOfWeek];
    if (dayOfWeek + 1 === 8) dayOfWeek = 0;
    dayOfWeek++;
    num++;
  }

  return month;
};

export const weekMaker = (when) => {
  const daysInWeek = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7,
  };

  let month = monthMaker(when);
  let monthLength = Object.values(month).length;
  let day = month[monthLength];
  let newNum = daysInWeek[day];
  let num = monthLength;
  let array = [];
  while (newNum > 0) {
    array.push(num);
    num--;
    newNum--;
  }
  let monthArray = [array.reverse()];
  while (num > 0) {
    let arr = [];
    for (let a = 0; a < 7; a++) {
      if (month[num]) arr.push(num);
      num--;
    }
    monthArray.push(arr.reverse());
  }
  let final = monthArray.reverse();
  return final;
};

