export const dateFormat = (date) => {
  if (!date) {
    return ""
  }

  const split_date = date.split("T")

  return split_date[0] + " " + split_date[1].split("Z")[0]
}