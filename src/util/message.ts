import { ElMessage } from 'element-plus'

const open = (msg: string) => {
  ElMessage({
    message: msg,
    showClose: true,
    type: 'error',
  })
}

export default open
