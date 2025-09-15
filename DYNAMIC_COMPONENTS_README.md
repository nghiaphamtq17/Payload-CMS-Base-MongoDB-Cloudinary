# Dynamic Components System

Hệ thống Dynamic Components cho phép bạn tạo và quản lý các component linh hoạt giống như Contentful, cho phép tái sử dụng và tùy chỉnh dễ dàng.

## Tính năng chính

- ✅ **Component Definitions**: Định nghĩa các loại component với fields tùy chỉnh
- ✅ **Dynamic Instances**: Tạo các instance của component với dữ liệu cụ thể
- ✅ **Flexible Fields**: Hỗ trợ nhiều loại field (text, media, array, group, etc.)
- ✅ **Admin Interface**: Giao diện quản lý trực quan trong Payload CMS
- ✅ **Page Integration**: Tích hợp dễ dàng vào pages thông qua blocks
- ✅ **Type Safety**: Hỗ trợ TypeScript đầy đủ

## Cấu trúc hệ thống

### 1. Component Definitions (`component-definitions`)
Định nghĩa các loại component có thể tái sử dụng:

```typescript
{
  name: "Hero",
  slug: "hero",
  category: "content",
  fields: [
    {
      name: "title",
      type: "text",
      required: true
    },
    {
      name: "subtitle", 
      type: "textarea",
      required: false
    },
    {
      name: "backgroundImage",
      type: "media",
      required: false
    }
  ]
}
```

### 2. Dynamic Components (`dynamic-components`)
Các instance cụ thể của component definitions:

```typescript
{
  name: "Welcome Hero",
  componentDefinition: "hero-definition-id",
  data: {
    title: "Welcome to Our Site",
    subtitle: "Discover amazing content",
    backgroundImage: { url: "/hero-bg.jpg" }
  }
}
```

### 3. Dynamic Component Block
Block để sử dụng dynamic components trong pages:

```typescript
{
  component: "dynamic-component-instance-id",
  customClassName: "my-custom-class",
  containerSettings: {
    maxWidth: "container",
    padding: "p-8"
  }
}
```

## Cách sử dụng

### Bước 1: Tạo Component Definition

1. Vào Admin Panel → Component Definitions
2. Click "Create New"
3. Điền thông tin:
   - **Name**: Tên hiển thị (VD: "Hero Section")
   - **Slug**: URL-safe identifier (VD: "hero")
   - **Category**: Chọn category phù hợp
   - **Fields**: Định nghĩa các fields cho component

### Bước 2: Tạo Dynamic Component Instance

1. Vào Admin Panel → Dynamic Components
2. Click "Create New"
3. Chọn Component Definition đã tạo
4. Điền dữ liệu cho các fields

### Bước 3: Sử dụng trong Page

1. Vào Pages → Edit/Create Page
2. Trong Content tab, thêm "Dynamic Component" block
3. Chọn Dynamic Component instance đã tạo
4. Tùy chỉnh container settings nếu cần

## Các loại Field được hỗ trợ

| Field Type | Mô tả | Ví dụ |
|------------|-------|-------|
| `text` | Text input đơn giản | Title, Name |
| `textarea` | Text area nhiều dòng | Description, Content |
| `richText` | Rich text editor | Long form content |
| `number` | Số | Price, Rating |
| `email` | Email address | Contact email |
| `url` | URL | Website, Link |
| `date` | Ngày tháng | Publish date |
| `checkbox` | Checkbox | Featured, Active |
| `select` | Dropdown select | Category, Status |
| `radioGroup` | Radio buttons | Theme, Layout |
| `media` | Upload media | Image, Video |
| `relationship` | Liên kết đến collection khác | Author, Category |
| `array` | Mảng các items | Cards, List items |
| `group` | Nhóm các fields | Address, Contact info |
| `json` | JSON data tùy chỉnh | Custom settings |

## Ví dụ thực tế

### Hero Component

```typescript
// Component Definition
{
  name: "Hero",
  slug: "hero",
  category: "content",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "subtitle", type: "textarea" },
    { name: "backgroundImage", type: "media" },
    { name: "ctaText", type: "text" },
    { name: "ctaUrl", type: "url" }
  ]
}

// Component Instance
{
  name: "Homepage Hero",
  data: {
    title: "Welcome to Our Website",
    subtitle: "Discover amazing content and services",
    backgroundImage: { url: "/hero-bg.jpg" },
    ctaText: "Get Started",
    ctaUrl: "/get-started"
  }
}
```

### Card Grid Component

```typescript
// Component Definition
{
  name: "Card Grid",
  slug: "card-grid",
  category: "layout",
  fields: [
    { name: "title", type: "text", required: true },
    { 
      name: "cards", 
      type: "array",
      arrayFields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        { name: "image", type: "media" },
        { name: "link", type: "url" }
      ]
    }
  ]
}
```

## Tùy chỉnh giao diện

### Custom CSS Classes

```typescript
// Trong Dynamic Component Block
{
  component: "hero-instance-id",
  customClassName: "my-hero-section bg-gradient-to-r from-blue-500 to-purple-600",
  customStyles: {
    minHeight: "500px",
    backgroundPosition: "center"
  }
}
```

### Container Settings

```typescript
{
  containerSettings: {
    disableInnerContainer: false, // Tắt container mặc định
    maxWidth: "max-w-4xl",        // Giới hạn chiều rộng
    padding: "p-8"                // Padding tùy chỉnh
  }
}
```

## API Usage

### Lấy tất cả Component Definitions

```typescript
const componentDefinitions = await payload.find({
  collection: 'component-definitions',
  where: {
    isActive: { equals: true }
  }
})
```

### Lấy Dynamic Components theo category

```typescript
const components = await payload.find({
  collection: 'dynamic-components',
  where: {
    'componentDefinition.category': { equals: 'content' },
    isPublished: { equals: true }
  }
})
```

### Tạo Dynamic Component mới

```typescript
const newComponent = await payload.create({
  collection: 'dynamic-components',
  data: {
    name: 'My New Component',
    componentDefinition: 'component-definition-id',
    data: {
      title: 'Hello World',
      description: 'This is a test component'
    }
  }
})
```

## Best Practices

1. **Đặt tên rõ ràng**: Sử dụng tên mô tả cho component definitions
2. **Phân loại đúng**: Chọn category phù hợp để dễ quản lý
3. **Validation**: Luôn đặt required cho các fields quan trọng
4. **Documentation**: Thêm description và help text cho fields
5. **Testing**: Test component trước khi deploy
6. **Performance**: Tránh tạo quá nhiều fields phức tạp trong một component

## Troubleshooting

### Component không hiển thị
- Kiểm tra `isActive` và `isPublished` flags
- Đảm bảo component definition có fields hợp lệ
- Kiểm tra data structure có đúng với field definitions

### Styling không áp dụng
- Kiểm tra `customClassName` và `customStyles`
- Đảm bảo CSS classes tồn tại
- Kiểm tra container settings

### Performance issues
- Giới hạn số lượng fields trong component
- Sử dụng pagination cho array fields lớn
- Optimize media uploads

## Mở rộng hệ thống

### Thêm Field Type mới

1. Cập nhật `ComponentDefinitions` collection
2. Thêm logic render trong `DynamicComponentRenderer`
3. Cập nhật `createDynamicFields` utility

### Custom Admin Components

```typescript
// Trong payload.config.ts
admin: {
  components: {
    beforeDashboard: ['@/components/DynamicComponentAdmin']
  }
}
```

### Webhooks và Automation

```typescript
// Tự động tạo component instances
hooks: {
  afterChange: [
    async ({ doc, req }) => {
      if (doc.isActive) {
        // Tạo default instance
      }
    }
  ]
}
```

## Kết luận

Hệ thống Dynamic Components cung cấp một cách linh hoạt và mạnh mẽ để quản lý nội dung, tương tự như Contentful nhưng với sự kiểm soát hoàn toàn và tích hợp sâu với Payload CMS.
