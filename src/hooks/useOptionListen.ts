import { watch } from 'vue'
import { appStore } from '@/stores/modules/app'
import type { DownloadForm } from '@/hooks/useValidate'

export function useDownloadOptionListen(downloadForm: DownloadForm) {
  watch(
    () => downloadForm.timeLevel,
    () => {
      downloadForm.product = ''
      appStore.category = ''
      appStore.displayFtrDatas = []
      appStore.displayOptDatas = []
      appStore.displayIdxDatas = []
      appStore.displayOtcDatas = []
    }
  )

  watch(
    () => downloadForm.rangePicker,
    () => {
      downloadForm.date = []
    }
  )
}
