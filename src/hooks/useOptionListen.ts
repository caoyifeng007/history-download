import { watch } from 'vue'
import type { Store } from 'pinia'
import type { HqyStateTree } from '@/stores'
import type { DownloadForm } from '@/hooks/useValidate'

export function useDownloadOptionListen(
  downloadForm: DownloadForm,
  store: Store<string, HqyStateTree>
) {
  watch(
    () => downloadForm.timeLevel,
    () => {
      downloadForm.product = ''
      store.category = ''
      store.displayFtrDatas = []
      store.displayOptDatas = []
      store.displayIdxDatas = []
      store.displayOtcDatas = []
    }
  )

  watch(
    () => downloadForm.rangePicker,
    () => {
      downloadForm.date = []
    }
  )
}
