const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}

export function useDatePicker() {
  return { disabledDate }
}
