export function AddHours(hoursArray: any) {

  let totalMinutes = hoursArray.reduce((total: any, hour: any) => {
    return total + Number(hour.split(":")[0]) * 60 + Number(hour.split(":")[1])
  }, 0)

  let hours = Math.floor(totalMinutes / 60).toString()
  let minutes = (totalMinutes % 60).toString()

  if (Number(hours) < 10) hours = "0" + hours
  if (Number(minutes) < 10) minutes = "0" + minutes

  return hours + ":" + minutes
}