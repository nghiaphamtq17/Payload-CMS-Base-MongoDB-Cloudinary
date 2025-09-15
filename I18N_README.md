# Hệ thống Đa ngôn ngữ (i18n) cho Dynamic Components

Hệ thống đa ngôn ngữ cho phép bạn tạo và quản lý nội dung bằng nhiều ngôn ngữ khác nhau, đặc biệt hữu ích cho các website quốc tế.

## 🌍 Tính năng chính

- ✅ **Hỗ trợ đa ngôn ngữ**: Tiếng Việt và Tiếng Anh (có thể mở rộng)
- ✅ **Language Switcher**: Component chuyển đổi ngôn ngữ linh hoạt
- ✅ **Translation Management**: Quản lý bản dịch trong Admin Panel
- ✅ **Auto-detection**: Tự động phát hiện ngôn ngữ từ URL/browser
- ✅ **Formatting**: Định dạng ngày, tiền tệ, số theo ngôn ngữ
- ✅ **Dynamic Components**: Tích hợp với hệ thống Dynamic Components

## 🚀 Cách sử dụng

### 1. Cấu hình ngôn ngữ

Hệ thống hỗ trợ 2 ngôn ngữ mặc định:
- **Tiếng Việt (vi)**: Ngôn ngữ mặc định
- **Tiếng Anh (en)**: Ngôn ngữ thứ hai

### 2. Tạo bản dịch

1. Vào Admin Panel → **Bản dịch**
2. Click "Create New"
3. Điền thông tin:
   - **Khóa bản dịch**: VD: `hero-1.title`
   - **Ngôn ngữ**: Chọn ngôn ngữ đích
   - **Nội dung đã dịch**: Nhập nội dung đã dịch
   - **Loại component**: Chọn loại component
   - **Trạng thái**: Chọn trạng thái (Draft/Review/Approved/Published)

### 3. Sử dụng Language Switcher

```tsx
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

// Dropdown variant (mặc định)
<LanguageSwitcher />

// Button variant
<LanguageSwitcher variant="buttons" />

// Select variant
<LanguageSwitcher variant="select" />

// Tùy chỉnh hiển thị
<LanguageSwitcher 
  showFlags={true}
  showNativeNames={true}
  className="my-custom-class"
/>
```

### 4. Sử dụng với Dynamic Components

```tsx
import { DynamicComponentRenderer } from '@/components/DynamicComponentRenderer'

<DynamicComponentRenderer
  component={yourComponent}
  translations={translations}
  language={currentLanguage}
/>
```

## 📝 Cấu trúc Translation Key

Translation keys được tạo theo format: `{componentId}.{fieldName}`

Ví dụ:
- `hero-1.title` - Tiêu đề của hero component có ID là hero-1
- `card-grid-1.cards.0.title` - Tiêu đề của card đầu tiên trong card grid
- `contact-form-1.submitText` - Text của nút submit trong contact form

## 🛠️ API Functions

### getCurrentLanguage()
Lấy ngôn ngữ hiện tại từ URL, localStorage, hoặc browser.

```typescript
import { getCurrentLanguage } from '@/utilities/i18n'

const currentLang = getCurrentLanguage() // 'vi' hoặc 'en'
```

### setCurrentLanguage(language)
Thay đổi ngôn ngữ hiện tại.

```typescript
import { setCurrentLanguage } from '@/utilities/i18n'

setCurrentLanguage('en') // Chuyển sang tiếng Anh
```

### getTranslation(key, language, translations)
Lấy bản dịch theo key và ngôn ngữ.

```typescript
import { getTranslation } from '@/utilities/i18n'

const translatedText = getTranslation('hero-1.title', 'vi', translations)
```

### formatDate(date, language)
Định dạng ngày theo ngôn ngữ.

```typescript
import { formatDate } from '@/utilities/i18n'

const formattedDate = formatDate(new Date(), 'vi') // 15/01/2024
const formattedDateEn = formatDate(new Date(), 'en') // 01/15/2024
```

### formatCurrency(amount, language)
Định dạng tiền tệ theo ngôn ngữ.

```typescript
import { formatCurrency } from '@/utilities/i18n'

const formattedPrice = formatCurrency(1000000, 'vi') // 1.000.000 ₫
const formattedPriceEn = formatCurrency(1000000, 'en') // $1,000,000.00
```

### formatNumber(number, language)
Định dạng số theo ngôn ngữ.

```typescript
import { formatNumber } from '@/utilities/i18n'

const formattedNumber = formatNumber(1234567.89, 'vi') // 1.234.567,89
const formattedNumberEn = formatNumber(1234567.89, 'en') // 1,234,567.89
```

## 🎨 Styling

### CSS Classes

```css
/* Language Switcher */
.language-switcher { }
.language-switcher button { }
.language-switcher .dropdown { }

/* Dynamic Component với i18n */
.dynamic-component[data-language="vi"] { }
.dynamic-component[data-language="en"] { }

/* RTL Support */
.dynamic-component[data-direction="rtl"] { }
```

### Tailwind Classes

```tsx
// Language switcher với Tailwind
<LanguageSwitcher className="bg-blue-500 text-white rounded-lg px-4 py-2" />

// Dynamic component với language-specific styling
<div className="dynamic-component" data-language={currentLanguage}>
  {/* Component content */}
</div>
```

## 📊 Quản lý bản dịch

### 1. Tạo bản dịch hàng loạt

```typescript
// Tạo bản dịch cho tất cả fields của một component
const createComponentTranslations = (componentId: string, fields: string[], translations: Record<string, Record<string, string>>) => {
  const result = []
  
  Object.keys(translations).forEach(language => {
    fields.forEach(field => {
      result.push({
        key: `${componentId}.${field}`,
        language,
        value: translations[language][field],
        status: 'published'
      })
    })
  })
  
  return result
}

// Sử dụng
const heroTranslations = createComponentTranslations('hero-1', ['title', 'subtitle'], {
  vi: {
    title: 'Chào mừng',
    subtitle: 'Khám phá'
  },
  en: {
    title: 'Welcome',
    subtitle: 'Discover'
  }
})
```

### 2. Kiểm tra bản dịch thiếu

```typescript
import { getMissingTranslations } from '@/utilities/i18n'

const missingTranslations = getMissingTranslations('vi', allTranslations)
console.log('Missing Vietnamese translations:', missingTranslations)
```

### 3. Theo dõi tiến độ dịch

```typescript
import { getTranslationProgress } from '@/utilities/i18n'

const progress = getTranslationProgress('vi', allTranslations)
console.log(`Vietnamese: ${progress.completed}/${progress.total} (${progress.percentage}%)`)
```

## 🔧 Cấu hình nâng cao

### Thêm ngôn ngữ mới

1. Cập nhật `LANGUAGE_CONFIG` trong `src/utilities/i18n.ts`:

```typescript
export const LANGUAGE_CONFIG = {
  vi: { /* existing config */ },
  en: { /* existing config */ },
  fr: { // Ngôn ngữ mới
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    currency: 'EUR',
  },
}
```

2. Cập nhật `SUPPORTED_LANGUAGES`:

```typescript
export const SUPPORTED_LANGUAGES = ['vi', 'en', 'fr'] as const
```

### Tùy chỉnh URL routing

```typescript
// Trong next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/:lang((?!vi|en).*)',
        destination: '/vi',
        permanent: false,
      },
    ]
  },
}
```

### SEO cho đa ngôn ngữ

```tsx
// Trong page component
export async function generateMetadata({ params }) {
  const { lang } = params
  
  return {
    title: getTranslation('page.title', lang),
    description: getTranslation('page.description', lang),
    alternates: {
      languages: {
        'vi': '/vi',
        'en': '/en',
      },
    },
  }
}
```

## 🐛 Troubleshooting

### Bản dịch không hiển thị
- Kiểm tra `status` của translation phải là 'published'
- Kiểm tra `key` có đúng format không
- Kiểm tra `language` có khớp với ngôn ngữ hiện tại không

### Language switcher không hoạt động
- Kiểm tra `localStorage` có bị chặn không
- Kiểm tra `window` object có available không (SSR issue)

### Formatting không đúng
- Kiểm tra browser có hỗ trợ `Intl` API không
- Kiểm tra language code có đúng không

## 📈 Performance Tips

1. **Cache translations**: Sử dụng cache để tránh fetch lại translations
2. **Lazy load**: Chỉ load translations khi cần
3. **Bundle splitting**: Tách translations theo ngôn ngữ
4. **CDN**: Sử dụng CDN cho static translations

## 🎯 Best Practices

1. **Consistent keys**: Sử dụng naming convention nhất quán cho translation keys
2. **Context**: Thêm context cho translations phức tạp
3. **Review process**: Có quy trình review translations
4. **Fallback**: Luôn có fallback về ngôn ngữ mặc định
5. **Testing**: Test với tất cả ngôn ngữ được hỗ trợ

## 🔗 Liên kết hữu ích

- [Payload CMS Localization](https://payloadcms.com/docs/configuration/localization)
- [Next.js Internationalization](https://nextjs.org/docs/advanced-features/i18n)
- [Intl API Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
