function getMonday(d) {
  const dayOfWeekNum = d.getDay()
  const monday = new Date(
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getFullYear(),
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getMonth(),
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getDate() -
      dayOfWeekNum +
      (dayOfWeekNum !== 0 ? 1 : -6)
  )

  return monday
}

export default getMonday
