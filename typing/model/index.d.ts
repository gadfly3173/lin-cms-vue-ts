/**
 * @GeneratedAt: Sun Oct 24 2021 21:26:26 GMT+0800 (中国标准时间)
 * @By: JC_Docs
 * @Title: 赅玩智能营销服务中台
 * @Version: last
 * @Schemes: http
 * @basePath: /smart
 */
/**
 * 通用Response */
declare interface ResUnifyResponseVO {
  code: number
  /**  @string */
  message: string
  /**  @string */
  request: string
}
/**
 * 通用分页Response */
declare interface ResPageResponseVO<T> {
  total: number
  /**  @array */
  items: T[]
  /**  @integer */
  page: number
  /**  @integer */
  count: number
}
/**
 * 文件上传
 * @URL:[post]/cms/file */
declare type ResFile =
  /** 文件信息 @array */
  /**  @object */
  {
    id: number
    /** 文件 key，上传时指定的 @string */
    key: string
    /** 文件路径 @string */
    path: string
    /** 文件 URL @string */
    url: string
  }[]
/**
 * ReqBody#修改用户密码-请求体数据
 * @URL:[put]/cms/admin/user/{id}/password */
declare interface ReqBodyAdminUserIdPassword {
  /**  @string */
  new_password: string
  /**  @string */
  confirm_password: string
}
/**
 * ReqBody#分配单个权限-请求体数据
 * @URL:[post]/cms/admin/permission/dispatch */
declare interface ReqBodyAdminPermissionDispatch {
  /**  @integer */
  group_id: number
  /**  @integer */
  permission_id: number
}
/**
 * ReqBody#分配多个权限-请求体数据
 * @URL:[post]/cms/admin/permission/dispatch/batch */
declare interface ReqBodyAdminPermissionDispatchBatch {
  /**  @integer */
  group_id: number
  /**  @array */
  permission_ids?: number[]
}
/**
 * 删除一个权限组
 * @URL:[delete]/cms/admin/group/{id} */
declare interface ResDeleteAdminGroupId {
  code?: number
  /**  @string */
  message?: string
  /**  @string */
  request?: string
}
/**
 * ReqBody#更新一个权限组-请求体数据
 * @URL:[put]/cms/admin/group/{id} */
declare interface ReqBodyPutAdminGroupId {
  /**  @string */
  name: string
  /**  @string */
  info?: string
}
/**
 * 查询一个权限组及其权限
 * @URL:[get]/cms/admin/group/{id} */
declare interface ResGetAdminGroupId {
  id?: number
  /**  @string */
  name?: string
  /**  @string */
  info?: string
  /**  @array */
  permissions?: {
    name?: string
    /** 权限所属模块，例如：人员管理 @string */
    module?: string
    /** 0：关闭 1：开启 @boolean */
    mount?: boolean
    /**  @integer */
    id?: number
    /**  @string */
    create_time?: string
    /**  @string */
    update_time?: string
  }[]
}
/**
 * ReqBody#删除多个权限-请求体数据
 * @URL:[post]/cms/admin/permission/remove */
declare interface ReqBodyAdminPermissionRemove {
  /**  @integer */
  group_id: number
  /**  @array */
  permission_ids?: number[]
}
/**
 * ReqBody#管理员更新用户信息-请求体数据
 * @URL:[put]/cms/admin/user/{id} */
declare interface ReqBodyPutAdminUserId {
  /**  @array */
  group_ids: number[]
  /**  @string */
  email?: string
  /**  @string */
  nickname?: string
}
/**
 * ReqBody#新建权限组-请求体数据
 * @URL:[post]/cms/admin/group */
declare interface ReqBodyPostAdminGroup {
  /**  @string */
  name: string
  /**  @string */
  info?: string
  /**  @array */
  permission_ids?: number[]
}
/**
 * 查询所有权限组及其权限
 * @URL:[get]/cms/admin/group */
declare interface ResGetAdminGroup {
  total?: number
  /**  @array */
  items?: {
    name?: string
    /** 分组信息：例如：搬砖的人 @string */
    info?: string
    /** 分组级别（root、guest、user，其中 root、guest 分组只能存在一个） @string */
    level?: string
    /**  @integer */
    id?: number
    /**  @string */
    create_time?: string
    /**  @string */
    update_time?: string
  }[]
  /**  @integer */
  page?: number
  /**  @integer */
  count?: number
}
/**
 * 查询所有可分配的权限
 * @URL:[get]/cms/admin/permission */
declare interface ResAdminPermission {
  key?: {
    name?: string
    /** 权限所属模块，例如：人员管理 @string */
    module?: string
    /** 0：关闭 1：开启 @boolean */
    mount?: boolean
    /**  @integer */
    id?: number
    /**  @string */
    create_time?: string
    /**  @string */
    update_time?: string
  }[]
}
/**
 * 查询所有权限组
 * @URL:[get]/cms/admin/group/all */
declare type ResAdminGroupAll =
  /**  @array */
  /**  @object */
  {
    name?: string
    /** 分组信息：例如：搬砖的人 @string */
    info?: string
    /** 分组级别（root、guest、user，其中 root、guest 分组只能存在一个） @string */
    level?: string
    /**  @integer */
    id?: number
    /**  @string */
    create_time?: string
    /**  @string */
    update_time?: string
  }[]
/**
 * 查询所有用户
 * @URL:[get]/cms/admin/users */
declare interface ResAdminUsers {
  total?: number
  /**  @array */
  items?: {
    id?: number
    /** 用户名，唯一 @string */
    username?: string
    /** 用户昵称 @string */
    nickname?: string
    /** 头像url @string */
    avatar?: string
    /** 邮箱 @string */
    email?: string
    /** 分组 @array */
    groups?: {
      name?: string
      /** 分组信息：例如：搬砖的人 @string */
      info?: string
      /** 分组级别（root、guest、user，其中 root、guest 分组只能存在一个） @string */
      level?: string
      /**  @integer */
      id?: number
      /**  @string */
      create_time?: string
      /**  @string */
      update_time?: string
    }[]
  }[]
  /**  @integer */
  page?: number
  /**  @integer */
  count?: number
}
/**
 * 搜索日志
 * @URL:[get]/cms/log/search */
declare interface ResLogSearch {
  total?: number
  /**  @array */
  items?: {
    message?: string
    /**  @integer */
    user_id?: number
    /**  @string */
    username?: string
    /**  @integer */
    status_code?: number
    /**  @string */
    method?: string
    /**  @string */
    path?: string
    /**  @string */
    permission?: string
    /**  @integer */
    id?: number
    /**  @string */
    create_time?: string
    /**  @string */
    update_time?: string
  }[]
  /**  @integer */
  page?: number
  /**  @integer */
  count?: number
}
/**
 * 查询所有日志
 * @URL:[get]/cms/log */
declare interface ResLog {
  total?: number
  /**  @array */
  items?: {
    message?: string
    /**  @integer */
    user_id?: number
    /**  @string */
    username?: string
    /**  @integer */
    status_code?: number
    /**  @string */
    method?: string
    /**  @string */
    path?: string
    /**  @string */
    permission?: string
    /**  @integer */
    id?: number
    /**  @string */
    create_time?: string
    /**  @string */
    update_time?: string
  }[]
  /**  @integer */
  page?: number
  /**  @integer */
  count?: number
}
/**
 * 查询日志记录的用户
 * @URL:[get]/cms/log/users */
declare interface ResLogUsers {
  total?: number
  /**  @array */
  items?: string[]
  /**  @integer */
  page?: number
  /**  @integer */
  count?: number
}
/**
 * getCaptchaImg
 * @URL:[get]/cms/user/get_captcha_img */
declare interface ResUserGetCaptchaImg {
  code_token?: string
  /** 图片 @string */
  img?: string
}
/**
 * ReqBody#修改密码-请求体数据
 * @URL:[put]/cms/user/change_password */
declare interface ReqBodyUserChangePassword {
  /**  @string */
  new_password: string
  /**  @string */
  confirm_password: string
  /**  @string */
  old_password: string
}
/**
 * 刷新令牌
 * @URL:[get]/cms/user/refresh */
declare interface ResUserRefresh {
  access_token?: string
  /**  @string */
  refresh_token?: string
}
/**
 * ReqBody#更新用户信息-请求体数据
 * @URL:[put]/cms/user */
declare interface ReqBodyUser {
  /**  @string */
  email?: string
  /**  @string */
  nickname?: string
  /**  @string */
  avatar?: string
}
/**
 * 查询拥有权限
 * @URL:[get]/cms/user/permissions */
declare interface ResUserPermissions {
  id?: number
  /**  @string */
  nickname?: string
  /**  @string */
  avatar?: string
  /**  @boolean */
  admin?: boolean
  /**  @string */
  email?: string
  /**  @array */
  permissions?: {
    key?: {
      module?: string
      /**  @string */
      permission?: string
    }[]
  }[]
}
/**
 * 查询自己信息
 * @URL:[get]/cms/user/information */
declare interface ResUserInformation {
  id?: number
  /** 用户名，唯一 @string */
  username?: string
  /** 用户昵称 @string */
  nickname?: string
  /** 头像url @string */
  avatar?: string
  /** 邮箱 @string */
  email?: string
  /** 分组 @array */
  groups?: {
    name?: string
    /** 分组信息：例如：搬砖的人 @string */
    info?: string
    /** 分组级别（root、guest、user，其中 root、guest 分组只能存在一个） @string */
    level?: string
    /**  @integer */
    id?: number
    /**  @string */
    create_time?: string
    /**  @string */
    update_time?: string
  }[]
}
/**
 * ReqBody#用户注册-请求体数据
 * @URL:[post]/cms/user/register */
declare interface ReqBodyUserRegister {
  /**  @string */
  username: string
  /**  @string */
  nickname?: string
  /**  @array */
  group_ids?: number[]
  /**  @string */
  email?: string
  /**  @string */
  password: string
  /**  @string */
  confirm_password: string
}
/**
 * 用户登陆
 * @URL:[post]/cms/user/login */
declare interface ResUserLogin {
  access_token?: string
  /**  @string */
  refresh_token?: string
}
/**
 * ReqBody#用户登陆-请求体数据
 * @URL:[post]/cms/user/login */
declare interface ReqBodyUserLogin {
  /**  @string */
  username: string
  /**  @string */
  password: string
  /**  @string */
  captcha: string
  /**  @string */
  code_token: string
}
