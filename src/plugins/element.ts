import {
  ElButton,
  ElInput,
  ElContainer,
  ElHeader,
  ElMain,
  ElFooter,
  ElRow,
  ElCol,
  ElCard,
  ElDatePicker,
  ElSelect,
  ElOption,
  ElRadioGroup,
  ElRadio,
  ElRadioButton,
} from 'element-plus'
// import lang from 'element-plus/lib/locale/lang/zh-cn'
// import { use } from 'element-plus/lib/locale'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { App } from 'vue'

export default (app: App): void => {
  // use(lang)
  app
    .use(ElementPlus, {
      locale: zhCn,
    })
    .use(ElButton)
    .use(ElInput)
    .use(ElContainer)
    .use(ElHeader)
    .use(ElMain)
    .use(ElFooter)
    .use(ElRow)
    .use(ElCol)
    .use(ElCard)
    .use(ElDatePicker)
    .use(ElSelect)
    .use(ElOption)
    .use(ElRadioGroup)
    .use(ElRadio)
    .use(ElRadioButton)
}
