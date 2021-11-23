import moment from "moment"

export default class DateUtility {
  static formatDate = (date: Date, format = "DD-MMM-YYYY hh:mm A") => {
    if (!date) {
      return ""
    }
    return moment(date).format(format)
  }

  static strToDate = (date: Date, format = "YYYY-MM-DD") => {
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

  static addDays = (date: Date, days: number) =>
    moment(date).add(days, "days").toDate()

  static isDateAfter = (date1: Date, date2: Date) =>
    moment(date1).isAfter(moment(date2))

  static difference = (date1: Date, date2: Date, unit: any = "days") =>
    moment(date2).diff(date1, unit)

  static duration = (date1: Date, date2: Date) =>
    moment.duration(moment(date2).diff(date1))

  static hourMinuteTime = (date1: Date, date2: any) => {
    if (!date2) {
      date2 = moment().utc()
    }
    const diff = DateUtility.duration(date1, date2)
    return `${DateUtility.difference(date1, date2)}d ${diff.get("hours")}h`
  }

  static hoursList = () => {
    return Array.from({ length: 24 }, (_, i) => i).reduce(
      (r: any, hour: number) => {
        r.push(moment({ hour, minute: 0 }).format("h:mm A"))
        r.push(moment({ hour, minute: 30 }).format("h:mm A"))
        return r
      },
      []
    )
  }

  static getLocaleDate = () => {
    return new Date().toLocaleString()
  }
}
