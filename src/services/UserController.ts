/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request, useModel } from '@umijs/max';
import { useState } from 'react';
export async function login(params: API.UserInfo) {
  return request<API.Result_UserInfo_>('/api/OfficialController/login.do', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

export async function queryList(params: API.UserInfo) {
  return request<API.Result_PageInfo_Course__>(
    '/api/OfficialController/getPlaybackList.do',
    {
      method: 'POST',
      params: {
        uid: params.id,
        token: params.token,
      },
    },
  );
}

export async function queryPlaybackUrl(params: any) {
  return request<API.Result<API.Course>>(
    '/api/OfficialController/getPlaybackUrl.do',
    {
      method: 'POST',
      params,
    },
  );
}
