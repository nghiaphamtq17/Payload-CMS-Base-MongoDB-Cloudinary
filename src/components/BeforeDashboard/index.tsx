import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { AdminLanguageSwitcher } from '@/components/AdminLanguageSwitcher'
import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      {/* Language Switcher */}
      {/* <div className="mb-4 flex justify-end">
        <AdminLanguageSwitcher variant="buttons" showFlags={true} showNativeNames={true} />
      </div> */}

      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Chào mừng đến với bảng điều khiển! / Welcome to your dashboard!</h4>
        <p className="mt-2 text-sm">
          Hệ thống quản lý nội dung đã sẵn sàng. Bắt đầu bằng cách tạo nội dung mới.
          <br />
          Your content management system is ready. Start by creating new content.
        </p>
      </Banner>

      <div className="mt-4">
        <SeedButton />
      </div>
    </div>
  )
}

export default BeforeDashboard
