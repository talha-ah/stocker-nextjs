import moment from "moment"

export default class DateUtility {
  static formatDate = (date, format = "MM/DD/YYYY hh:mm A") => {
    if (!date) {
      return ""
    }
    return moment(date).format(format)
  }

  static strToDate = (date, format = "YYYY-MM-DD") => {
    if (!date) {
      return ""
    }
    return moment(date, format).toDate()
  }

  static getDays = () =>
    Array.apply(null, Array(7)).map((_, i) =>
      moment(i, "e")
        .startOf("week")
        .isoWeekday(i + 1)
        .format("dddd")
    )

  static addDays = (date, days) => moment(date).add(days, "days").toDate()

  static isDateAfter = (date1, date2) => moment(date1).isAfter(moment(date2))

  static difference = (date1, date2, unit = "days") =>
    moment(date2).diff(date1, unit)

  static duration = (date1, date2) => moment.duration(moment(date2).diff(date1))

  static hourMinuteTime = (date1, date2) => {
    if (!date2) {
      date2 = moment().utc()
    }
    const diff = DateUtility.duration(date1, date2)
    return `${DateUtility.difference(date1, date2)}d ${diff.get("hours")}h`
  }

  static hoursList = () => {
    return Array.from({ length: 24 }, (_, i) => i).reduce((r, hour) => {
      r.push(moment({ hour, minute: 0 }).format("h:mm A"))
      r.push(moment({ hour, minute: 30 }).format("h:mm A"))
      return r
    }, [])
  }

  static getLocaleDate = () => {
    return new Date().toLocaleString()
  }
}
