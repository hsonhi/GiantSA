export function convertDataToSelectOptions(
  data: any[],
  label: string,
  value: string | number,
) {
  return data && data.length > 0
    ? data.map((item) => ({
        id: item?.id,
        description: item[label],
        value: item[value].toString(),
      }))
    : []
}
