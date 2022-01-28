import { ref, reactive } from 'vue'

// const selectedTimeGrade = ref('DayPicker')
const selectedTimeGrade = ref('')

export function useTimeGrade() {
  return { selectedTimeGrade }
}

export { selectedTimeGrade }
