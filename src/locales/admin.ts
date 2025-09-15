/**
 * Admin Interface Translations
 * Bản dịch cho giao diện admin của Payload CMS
 */

export const adminTranslations = {
  vi: {
    // Navigation
    nav: {
      dashboard: 'Bảng điều khiển',
      pages: 'Trang',
      posts: 'Bài viết',
      media: 'Media',
      categories: 'Danh mục',
      skills: 'Kỹ năng',
      skillCategories: 'Danh mục kỹ năng',
      users: 'Người dùng',
      custom: 'Tùy chỉnh',
      componentDefinitions: 'Định nghĩa Component',
      dynamicComponents: 'Component động',
      languages: 'Ngôn ngữ',
      translations: 'Bản dịch',
    },

    // Common actions
    actions: {
      create: 'Tạo mới',
      edit: 'Chỉnh sửa',
      delete: 'Xóa',
      save: 'Lưu',
      cancel: 'Hủy',
      publish: 'Xuất bản',
      unpublish: 'Bỏ xuất bản',
      duplicate: 'Nhân bản',
      preview: 'Xem trước',
      search: 'Tìm kiếm',
      filter: 'Lọc',
      sort: 'Sắp xếp',
      export: 'Xuất',
      import: 'Nhập',
      refresh: 'Làm mới',
      back: 'Quay lại',
      next: 'Tiếp theo',
      previous: 'Trước đó',
      submit: 'Gửi',
      reset: 'Đặt lại',
    },

    // Form labels
    form: {
      title: 'Tiêu đề',
      slug: 'Slug',
      description: 'Mô tả',
      content: 'Nội dung',
      excerpt: 'Tóm tắt',
      featuredImage: 'Hình ảnh nổi bật',
      category: 'Danh mục',
      tags: 'Thẻ',
      status: 'Trạng thái',
      publishedAt: 'Ngày xuất bản',
      createdAt: 'Ngày tạo',
      updatedAt: 'Ngày cập nhật',
      author: 'Tác giả',
      name: 'Tên',
      email: 'Email',
      password: 'Mật khẩu',
      confirmPassword: 'Xác nhận mật khẩu',
      role: 'Vai trò',
      isActive: 'Đang hoạt động',
      isDefault: 'Mặc định',
      language: 'Ngôn ngữ',
      nativeName: 'Tên bản địa',
      flag: 'Cờ',
      direction: 'Hướng',
      dateFormat: 'Định dạng ngày',
      currency: 'Tiền tệ',
      key: 'Khóa',
      value: 'Giá trị',
      context: 'Ngữ cảnh',
      componentType: 'Loại component',
      componentId: 'ID Component',
      fieldName: 'Tên trường',
      notes: 'Ghi chú',
    },

    // Status values
    status: {
      draft: 'Bản nháp',
      published: 'Đã xuất bản',
      archived: 'Đã lưu trữ',
      active: 'Hoạt động',
      inactive: 'Không hoạt động',
      pending: 'Đang chờ',
      approved: 'Đã phê duyệt',
      rejected: 'Đã từ chối',
      review: 'Đang xem xét',
    },

    // Messages
    messages: {
      success: {
        created: 'Tạo thành công',
        updated: 'Cập nhật thành công',
        deleted: 'Xóa thành công',
        published: 'Xuất bản thành công',
        unpublished: 'Bỏ xuất bản thành công',
        saved: 'Lưu thành công',
      },
      error: {
        required: 'Trường này là bắt buộc',
        invalid: 'Giá trị không hợp lệ',
        notFound: 'Không tìm thấy',
        unauthorized: 'Không có quyền truy cập',
        serverError: 'Lỗi máy chủ',
        networkError: 'Lỗi kết nối',
        validationError: 'Lỗi xác thực',
      },
      confirm: {
        delete: 'Bạn có chắc chắn muốn xóa?',
        unpublish: 'Bạn có chắc chắn muốn bỏ xuất bản?',
        reset: 'Bạn có chắc chắn muốn đặt lại?',
      },
      info: {
        noData: 'Không có dữ liệu',
        loading: 'Đang tải...',
        saving: 'Đang lưu...',
        searching: 'Đang tìm kiếm...',
        noResults: 'Không tìm thấy kết quả',
        selectLanguage: 'Chọn ngôn ngữ',
        selectCategory: 'Chọn danh mục',
        selectStatus: 'Chọn trạng thái',
      },
    },

    // Collection labels
    collections: {
      pages: {
        label: 'Trang',
        singular: 'Trang',
        plural: 'Các trang',
        description: 'Quản lý các trang của website',
      },
      posts: {
        label: 'Bài viết',
        singular: 'Bài viết',
        plural: 'Các bài viết',
        description: 'Quản lý các bài viết blog',
      },
      media: {
        label: 'Media',
        singular: 'Media',
        plural: 'Media',
        description: 'Quản lý hình ảnh và video',
      },
      categories: {
        label: 'Danh mục',
        singular: 'Danh mục',
        plural: 'Các danh mục',
        description: 'Quản lý danh mục nội dung',
      },
      skills: {
        label: 'Kỹ năng',
        singular: 'Kỹ năng',
        plural: 'Các kỹ năng',
        description: 'Quản lý danh sách kỹ năng',
      },
      skillCategories: {
        label: 'Danh mục kỹ năng',
        singular: 'Danh mục kỹ năng',
        plural: 'Các danh mục kỹ năng',
        description: 'Quản lý danh mục kỹ năng',
      },
      users: {
        label: 'Người dùng',
        singular: 'Người dùng',
        plural: 'Các người dùng',
        description: 'Quản lý người dùng hệ thống',
      },
      custom: {
        label: 'Tùy chỉnh',
        singular: 'Tùy chỉnh',
        plural: 'Các mục tùy chỉnh',
        description: 'Nội dung tùy chỉnh linh hoạt',
      },
      componentDefinitions: {
        label: 'Định nghĩa Component',
        singular: 'Định nghĩa Component',
        plural: 'Các định nghĩa Component',
        description: 'Định nghĩa các loại component có thể tái sử dụng',
      },
      dynamicComponents: {
        label: 'Component động',
        singular: 'Component động',
        plural: 'Các component động',
        description: 'Quản lý các instance của dynamic components',
      },
      languages: {
        label: 'Ngôn ngữ',
        singular: 'Ngôn ngữ',
        plural: 'Các ngôn ngữ',
        description: 'Quản lý các ngôn ngữ cho website',
      },
      translations: {
        label: 'Bản dịch',
        singular: 'Bản dịch',
        plural: 'Các bản dịch',
        description: 'Quản lý bản dịch cho nội dung',
      },
    },

    // Field types
    fieldTypes: {
      text: 'Văn bản',
      textarea: 'Vùng văn bản',
      richText: 'Văn bản phong phú',
      number: 'Số',
      email: 'Email',
      url: 'URL',
      date: 'Ngày',
      checkbox: 'Checkbox',
      select: 'Chọn',
      radioGroup: 'Radio Group',
      media: 'Media',
      relationship: 'Liên kết',
      array: 'Mảng',
      group: 'Nhóm',
      json: 'JSON',
    },

    // Component categories
    componentCategories: {
      layout: 'Bố cục',
      content: 'Nội dung',
      media: 'Media',
      interactive: 'Tương tác',
      navigation: 'Điều hướng',
      form: 'Biểu mẫu',
      custom: 'Tùy chỉnh',
    },

    // Translation status
    translationStatus: {
      draft: 'Bản nháp',
      review: 'Đang xem xét',
      approved: 'Đã phê duyệt',
      published: 'Đã xuất bản',
    },

    // Component types
    componentTypes: {
      'dynamic-component': 'Dynamic Component',
      'page-content': 'Nội dung trang',
      navigation: 'Điều hướng',
      form: 'Biểu mẫu',
      ui: 'Giao diện',
      other: 'Khác',
    },
  },

  en: {
    // Navigation
    nav: {
      dashboard: 'Dashboard',
      pages: 'Pages',
      posts: 'Posts',
      media: 'Media',
      categories: 'Categories',
      skills: 'Skills',
      skillCategories: 'Skill Categories',
      users: 'Users',
      custom: 'Custom',
      componentDefinitions: 'Component Definitions',
      dynamicComponents: 'Dynamic Components',
      languages: 'Languages',
      translations: 'Translations',
    },

    // Common actions
    actions: {
      create: 'Create',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      publish: 'Publish',
      unpublish: 'Unpublish',
      duplicate: 'Duplicate',
      preview: 'Preview',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      export: 'Export',
      import: 'Import',
      refresh: 'Refresh',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      reset: 'Reset',
    },

    // Form labels
    form: {
      title: 'Title',
      slug: 'Slug',
      description: 'Description',
      content: 'Content',
      excerpt: 'Excerpt',
      featuredImage: 'Featured Image',
      category: 'Category',
      tags: 'Tags',
      status: 'Status',
      publishedAt: 'Published At',
      createdAt: 'Created At',
      updatedAt: 'Updated At',
      author: 'Author',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      role: 'Role',
      isActive: 'Active',
      isDefault: 'Default',
      language: 'Language',
      nativeName: 'Native Name',
      flag: 'Flag',
      direction: 'Direction',
      dateFormat: 'Date Format',
      currency: 'Currency',
      key: 'Key',
      value: 'Value',
      context: 'Context',
      componentType: 'Component Type',
      componentId: 'Component ID',
      fieldName: 'Field Name',
      notes: 'Notes',
    },

    // Status values
    status: {
      draft: 'Draft',
      published: 'Published',
      archived: 'Archived',
      active: 'Active',
      inactive: 'Inactive',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      review: 'Review',
    },

    // Messages
    messages: {
      success: {
        created: 'Created successfully',
        updated: 'Updated successfully',
        deleted: 'Deleted successfully',
        published: 'Published successfully',
        unpublished: 'Unpublished successfully',
        saved: 'Saved successfully',
      },
      error: {
        required: 'This field is required',
        invalid: 'Invalid value',
        notFound: 'Not found',
        unauthorized: 'Unauthorized',
        serverError: 'Server error',
        networkError: 'Network error',
        validationError: 'Validation error',
      },
      confirm: {
        delete: 'Are you sure you want to delete?',
        unpublish: 'Are you sure you want to unpublish?',
        reset: 'Are you sure you want to reset?',
      },
      info: {
        noData: 'No data',
        loading: 'Loading...',
        saving: 'Saving...',
        searching: 'Searching...',
        noResults: 'No results found',
        selectLanguage: 'Select language',
        selectCategory: 'Select category',
        selectStatus: 'Select status',
      },
    },

    // Collection labels
    collections: {
      pages: {
        label: 'Pages',
        singular: 'Page',
        plural: 'Pages',
        description: 'Manage website pages',
      },
      posts: {
        label: 'Posts',
        singular: 'Post',
        plural: 'Posts',
        description: 'Manage blog posts',
      },
      media: {
        label: 'Media',
        singular: 'Media',
        plural: 'Media',
        description: 'Manage images and videos',
      },
      categories: {
        label: 'Categories',
        singular: 'Category',
        plural: 'Categories',
        description: 'Manage content categories',
      },
      skills: {
        label: 'Skills',
        singular: 'Skill',
        plural: 'Skills',
        description: 'Manage skills list',
      },
      skillCategories: {
        label: 'Skill Categories',
        singular: 'Skill Category',
        plural: 'Skill Categories',
        description: 'Manage skill categories',
      },
      users: {
        label: 'Users',
        singular: 'User',
        plural: 'Users',
        description: 'Manage system users',
      },
      custom: {
        label: 'Custom',
        singular: 'Custom',
        plural: 'Custom Items',
        description: 'Flexible custom content',
      },
      componentDefinitions: {
        label: 'Component Definitions',
        singular: 'Component Definition',
        plural: 'Component Definitions',
        description: 'Define reusable component types',
      },
      dynamicComponents: {
        label: 'Dynamic Components',
        singular: 'Dynamic Component',
        plural: 'Dynamic Components',
        description: 'Manage dynamic component instances',
      },
      languages: {
        label: 'Languages',
        singular: 'Language',
        plural: 'Languages',
        description: 'Manage website languages',
      },
      translations: {
        label: 'Translations',
        singular: 'Translation',
        plural: 'Translations',
        description: 'Manage content translations',
      },
    },

    // Field types
    fieldTypes: {
      text: 'Text',
      textarea: 'Textarea',
      richText: 'Rich Text',
      number: 'Number',
      email: 'Email',
      url: 'URL',
      date: 'Date',
      checkbox: 'Checkbox',
      select: 'Select',
      radioGroup: 'Radio Group',
      media: 'Media',
      relationship: 'Relationship',
      array: 'Array',
      group: 'Group',
      json: 'JSON',
    },

    // Component categories
    componentCategories: {
      layout: 'Layout',
      content: 'Content',
      media: 'Media',
      interactive: 'Interactive',
      navigation: 'Navigation',
      form: 'Form',
      custom: 'Custom',
    },

    // Translation status
    translationStatus: {
      draft: 'Draft',
      review: 'Review',
      approved: 'Approved',
      published: 'Published',
    },

    // Component types
    componentTypes: {
      'dynamic-component': 'Dynamic Component',
      'page-content': 'Page Content',
      navigation: 'Navigation',
      form: 'Form',
      ui: 'UI Elements',
      other: 'Other',
    },
  },
}

export type AdminLanguage = keyof typeof adminTranslations
export type AdminTranslationKey = keyof typeof adminTranslations.vi
