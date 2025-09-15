# Hệ thống i18n cho Payload CMS Admin Interface

Hệ thống đa ngôn ngữ cho giao diện admin của Payload CMS, hỗ trợ tiếng Việt và tiếng Anh.

## 🌍 Tính năng chính

- ✅ **Admin Interface Translations**: Bản dịch cho toàn bộ giao diện admin
- ✅ **Language Switcher**: Chuyển đổi ngôn ngữ trong admin panel
- ✅ **Bilingual Labels**: Labels song ngữ cho collections và fields
- ✅ **Context Provider**: React context để quản lý translations
- ✅ **Responsive Design**: Hỗ trợ mobile và desktop
- ✅ **Dark Mode**: Hỗ trợ dark mode

## 🚀 Cách sử dụng

### 1. Admin Language Switcher

```tsx
import { AdminLanguageSwitcher } from '@/components/AdminLanguageSwitcher'

// Dropdown variant (mặc định)
<AdminLanguageSwitcher />

// Button variant
<AdminLanguageSwitcher variant="buttons" />

// Select variant
<AdminLanguageSwitcher variant="select" />

// Tùy chỉnh hiển thị
<AdminLanguageSwitcher 
  showFlags={true}
  showNativeNames={true}
  className="my-custom-class"
  onLanguageChange={(lang) => console.log('Language changed:', lang)}
/>
```

### 2. Sử dụng Admin Translations

```tsx
import { useAdminTranslation } from '@/components/AdminTranslationProvider'

const MyComponent = () => {
  const { t, language } = useAdminTranslation()
  
  return (
    <div>
      <h1>{t('nav.dashboard')}</h1>
      <p>{t('messages.success.created')}</p>
      <button>{t('actions.save')}</button>
    </div>
  )
}
```

### 3. Admin Translation Provider

```tsx
import { AdminTranslationProvider } from '@/components/AdminTranslationProvider'

function App() {
  return (
    <AdminTranslationProvider>
      <YourAdminComponents />
    </AdminTranslationProvider>
  )
}
```

## 📝 Translation Keys

### Navigation
- `nav.dashboard` - Bảng điều khiển / Dashboard
- `nav.pages` - Trang / Pages
- `nav.posts` - Bài viết / Posts
- `nav.media` - Media
- `nav.categories` - Danh mục / Categories
- `nav.users` - Người dùng / Users
- `nav.languages` - Ngôn ngữ / Languages
- `nav.translations` - Bản dịch / Translations

### Actions
- `actions.create` - Tạo mới / Create
- `actions.edit` - Chỉnh sửa / Edit
- `actions.delete` - Xóa / Delete
- `actions.save` - Lưu / Save
- `actions.cancel` - Hủy / Cancel
- `actions.publish` - Xuất bản / Publish
- `actions.preview` - Xem trước / Preview
- `actions.search` - Tìm kiếm / Search

### Form Labels
- `form.title` - Tiêu đề / Title
- `form.slug` - Slug
- `form.description` - Mô tả / Description
- `form.content` - Nội dung / Content
- `form.status` - Trạng thái / Status
- `form.category` - Danh mục / Category
- `form.tags` - Thẻ / Tags
- `form.author` - Tác giả / Author

### Status Values
- `status.draft` - Bản nháp / Draft
- `status.published` - Đã xuất bản / Published
- `status.archived` - Đã lưu trữ / Archived
- `status.active` - Hoạt động / Active
- `status.inactive` - Không hoạt động / Inactive

### Messages
- `messages.success.created` - Tạo thành công / Created successfully
- `messages.success.updated` - Cập nhật thành công / Updated successfully
- `messages.success.deleted` - Xóa thành công / Deleted successfully
- `messages.error.required` - Trường này là bắt buộc / This field is required
- `messages.error.invalid` - Giá trị không hợp lệ / Invalid value
- `messages.info.loading` - Đang tải... / Loading...
- `messages.info.noData` - Không có dữ liệu / No data

### Collections
- `collections.pages.label` - Trang / Pages
- `collections.pages.singular` - Trang / Page
- `collections.pages.plural` - Các trang / Pages
- `collections.pages.description` - Quản lý các trang của website / Manage website pages

## 🎨 Styling

### CSS Classes

```css
/* Admin Language Switcher */
.admin-language-switcher { }
.admin-language-button { }
.admin-language-dropdown { }
.admin-language-dropdown-trigger { }
.admin-language-dropdown-item { }
```

### Tailwind Classes

```tsx
// Custom styling
<AdminLanguageSwitcher 
  className="bg-blue-500 text-white rounded-lg px-4 py-2" 
/>

// Responsive
<div className="hidden md:block">
  <AdminLanguageSwitcher variant="buttons" />
</div>
<div className="md:hidden">
  <AdminLanguageSwitcher variant="dropdown" />
</div>
```

## 🔧 Cấu hình

### 1. Thêm ngôn ngữ mới

Cập nhật `src/locales/admin.ts`:

```typescript
export const adminTranslations = {
  vi: { /* existing translations */ },
  en: { /* existing translations */ },
  fr: { // Ngôn ngữ mới
    nav: {
      dashboard: 'Tableau de bord',
      // ... other translations
    },
    // ... other sections
  },
}
```

### 2. Cập nhật Language Config

Cập nhật `src/utilities/i18n.ts`:

```typescript
export const SUPPORTED_LANGUAGES = ['vi', 'en', 'fr'] as const

export const LANGUAGE_CONFIG = {
  vi: { /* existing config */ },
  en: { /* existing config */ },
  fr: {
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    currency: 'EUR',
  },
}
```

### 3. Cập nhật Collections

Thêm labels song ngữ vào collections:

```typescript
export const MyCollection: CollectionConfig = {
  slug: 'my-collection',
  labels: {
    singular: 'My Item / Mục của tôi',
    plural: 'My Items / Các mục của tôi',
  },
  admin: {
    description: 'Manage my items / Quản lý các mục của tôi',
    group: 'Content / Nội dung',
  },
  // ...
}
```

## 📊 Quản lý Translations

### 1. Thêm translation mới

```typescript
// Trong src/locales/admin.ts
export const adminTranslations = {
  vi: {
    // ... existing translations
    newSection: {
      newKey: 'Giá trị tiếng Việt',
    },
  },
  en: {
    // ... existing translations
    newSection: {
      newKey: 'English value',
    },
  },
}
```

### 2. Sử dụng translation mới

```tsx
const { t } = useAdminTranslation()
const value = t('newSection.newKey') // 'Giá trị tiếng Việt' hoặc 'English value'
```

### 3. Fallback values

```tsx
const value = t('nonExistentKey', 'Default value') // 'Default value'
```

## 🐛 Troubleshooting

### Translation không hiển thị
- Kiểm tra key có đúng format không (VD: `nav.dashboard`)
- Kiểm tra language có được set đúng không
- Kiểm tra AdminTranslationProvider có wrap component không

### Language switcher không hoạt động
- Kiểm tra localStorage có bị chặn không
- Kiểm tra window object có available không (SSR issue)
- Kiểm tra event handlers có được bind đúng không

### Styling không áp dụng
- Kiểm tra CSS classes có được import không
- Kiểm tra Tailwind classes có được cấu hình không
- Kiểm tra responsive breakpoints

## 📈 Performance Tips

1. **Lazy load translations**: Chỉ load translations khi cần
2. **Memoize translations**: Sử dụng useMemo cho expensive translations
3. **Bundle splitting**: Tách translations theo ngôn ngữ
4. **Cache translations**: Cache translations trong localStorage

## 🎯 Best Practices

1. **Consistent keys**: Sử dụng naming convention nhất quán
2. **Nested structure**: Tổ chức translations theo cấu trúc phân cấp
3. **Fallback values**: Luôn có fallback cho missing translations
4. **Type safety**: Sử dụng TypeScript cho translation keys
5. **Testing**: Test với tất cả ngôn ngữ được hỗ trợ

## 🔗 Liên kết hữu ích

- [Payload CMS Admin UI](https://payloadcms.com/docs/admin/overview)
- [React Context API](https://reactjs.org/docs/context.html)
- [Internationalization Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
