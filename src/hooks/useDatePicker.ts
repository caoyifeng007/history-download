import { ref, onMounted } from 'vue'

const selectedDays = ref([])
const selectedDayRange = ref([])
const selectedPicker = ref<boolean>()

const shortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
]
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}

export function useDatePicker() {
  onMounted(() => {
    selectedPicker.value = false
  })

  return { selectedPicker, selectedDays, selectedDayRange, shortcuts, disabledDate }
}
