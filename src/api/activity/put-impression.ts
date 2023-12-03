import axios from '@/plugins/axios'
import type { Response } from '@/../@types/response'
import { ElNotification } from 'element-plus'
import type { MemberActivityStatus } from '@/../@types/activity'

export async function userModifyStatus(user: string, aid: string, status: MemberActivityStatus, notification: boolean = true) {
  const result = (
    await axios({
      url: `/user/${user.toString()}/activity/${aid}/status`,
      method: 'put',
      data: {
        status
      }
    })
  ).data as Response<null>
  if (result.status === 'error') {
    ElNotification({
      title: `同步感想状态失败（${result.code.toString()}）`,
      message: result.message,
      type: 'error'
    })
    return
  }
  if (notification !== false) {
    ElNotification({
      title: '提交成功',
      type: 'success'
    })
  }
  return
}

export async function userModifyImpression(user: string, aid: string, impression: string, submit: boolean) {
  const result = (
    await axios({
      url: `/user/${user.toString()}/activity/${aid}/impression`,
      method: 'put',
      data: {
        impression
      }
    })
  ).data as Response<null>
  if (submit) {
    await userModifyStatus(user, aid, 'pending', false)
  }
  if (result.status === 'error') {
    ElNotification({
      title: `同步感想内容失败（${result.code.toString()}）`,
      message: result.message,
      type: 'error'
    })
    return
  }
  ElNotification({
    title: '提交成功',
    type: 'success'
  })
  return
}
