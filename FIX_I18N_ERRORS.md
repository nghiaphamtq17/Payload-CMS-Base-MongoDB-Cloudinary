# Hướng dẫn sửa lỗi i18n

## Lỗi hiện tại

Có 1 lỗi TypeScript còn lại trong `src/collections/Translations.ts`:

```
Type '"languages"' is not assignable to type 'CollectionSlug | CollectionSlug[]'
```

## Cách sửa

### Bước 1: Generate Payload Types

Chạy lệnh sau để generate types từ Payload:

```bash
pnpm generate:types
```

Hoặc sử dụng script:

```bash
pnpm generate:types:script
```

### Bước 2: Cập nhật imports

Sau khi generate types, cập nhật các file sau:

1. **src/utilities/i18n.ts**:
```typescript
// Thay thế
import type { Language, Translation } from '@/types/temp-types'

// Bằng
import type { Language, Translation } from '@/payload-types'
```

2. **src/components/DynamicComponentRenderer/index.tsx**:
```typescript
// Thay thế
import type { Translation } from '@/types/temp-types'

// Bằng
import type { Translation } from '@/payload-types'
```

3. **src/examples/i18n-usage.tsx**:
```typescript
// Thay thế
import type { DynamicComponent, ComponentDefinition } from '@/types/temp-types'
import type { Translation } from '@/types/temp-types'

// Bằng
import type { DynamicComponent, ComponentDefinition, Translation } from '@/payload-types'
```

### Bước 3: Xóa file tạm thời

Sau khi cập nhật imports, có thể xóa file tạm thời:

```bash
rm src/types/temp-types.ts
```

### Bước 4: Sửa lỗi relationship

Trong `src/collections/Translations.ts`, thay thế:

```typescript
relationTo: 'languages' as any,
```

Bằng:

```typescript
relationTo: 'languages',
```

## Kiểm tra

Sau khi thực hiện các bước trên, chạy:

```bash
pnpm lint
```

Tất cả lỗi TypeScript sẽ được sửa.

## Lưu ý

- File `src/types/temp-types.ts` chỉ là tạm thời để tránh lỗi TypeScript
- Sau khi generate types từ Payload, có thể xóa file này
- Các types chính thức sẽ được tạo trong `src/payload-types.ts`
