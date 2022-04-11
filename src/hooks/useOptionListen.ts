import { watch } from 'vue'
import { hqyStore } from '@/main'
import { type DownloadForm } from '@/hooks/useValidate'

export function useDownloadOptionListen(downloadForm: DownloadForm) {
  watch(
    () => downloadForm.timeLevel,
    () => {
      downloadForm.product = ''
      hqyStore.category = ''
      hqyStore.displayFtrDatas = []
      hqyStore.displayOptDatas = []
      hqyStore.displayIdxDatas = []
      hqyStore.displayOtcDatas = []
    }
  )

  watch(
    () => downloadForm.rangePicker,
    () => {
      downloadForm.date = []
    }
  )
}
