import React from 'react'

import { AdminLanguageSwitcher } from '@/components/AdminLanguageSwitcher'

const BeforeLogin: React.FC = () => {
  return (
    <div>
      {/* Language Switcher */}
      <div className="mb-4 flex justify-end">
        <AdminLanguageSwitcher variant="dropdown" showFlags={true} showNativeNames={true} />
      </div>

      <p>
        <b>Chào mừng đến với bảng điều khiển! / Welcome to your dashboard!</b>
        <br />
        <span className="text-sm text-gray-600">
          Đây là nơi quản trị viên đăng nhập để quản lý website của bạn.
          <br />
          This is where site admins will log in to manage your website.
        </span>
      </p>
    </div>
  )
}

export default BeforeLogin
