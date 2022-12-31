import type { RequestConfig } from 'umi';

export async function getInitialState(): Promise<API.UserInfo> {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : {};
}
export const request: RequestConfig = {
  timeout: 1000,
  // other axios options you want
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [],
  responseInterceptors: [
    (response: any) => {
      // if (response?.data?.error?.returnCode === '10048') {
      //   history.replace('/');
      // }
      return response;
    },
  ],
};
// export const layout = () => {
//   return {
//     logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
//     menu: {
//       locale: false,
//     },
//   };
// };
