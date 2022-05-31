import { useCookies } from '@vueuse/integrations/useCookies'

const cookies = useCookies(['token'])

export function setToken(token: string) {
  const d = new Date()
  d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days
  cookies.set('token', token, { expires: d })
}

export function getToken() {
  return cookies.get('token')
}
