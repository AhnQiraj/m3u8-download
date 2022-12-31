/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface Error {
    returnCode?: string;
    returnMessage?: string;
    returnUserMessage?: string;
  }
  // interface Result {
  //   success?: boolean;
  //   errorMessage?: string;
  //   data?: Record<string, any>;
  // }

  interface Result_PageInfo_Course__ {
    error?: Error;
    data?: Array<Course>;
  }

  interface Result_UserInfo_ {
    error?: Error;
    data?: UserInfo;
  }

  interface Result<T> {
    error?: Error;
    data: T;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  interface UserInfo {
    mobile?: string;
    password?: string;
    id?: number;
    token?: string;
    userName?: string;
  }

  interface Course {
    classDate?: string;
    id?: number;
    playbackName?: string;
    resUrl?: string;
    teacher?: string;
    playbackUrl?: string;
  }

  type definitions_0 = null;
}
