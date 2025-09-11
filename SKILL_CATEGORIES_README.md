# Skill Categories & Skills - Hướng dẫn sử dụng

## Tổng quan

Tôi đã tạo một hệ thống quản lý skill categories và skills trong Payload CMS dựa trên dữ liệu bạn cung cấp. Hệ thống này cho phép bạn quản lý các kỹ năng của mình một cách có tổ chức thông qua admin panel.

## Cấu trúc dữ liệu

### Skill Categories Collection
- **title**: Tên category (ví dụ: "Frontend Development")
- **icon**: Tên icon component (ví dụ: "Code", "Server", "Database", "Palette")
- **color**: Tailwind CSS gradient classes (ví dụ: "from-blue-500 to-indigo-600")
- **skills**: Danh sách các skills thuộc category này
- **slug**: URL slug tự động tạo

### Skills Collection
- **name**: Tên skill (ví dụ: "React.js")
- **experience**: Mức độ kinh nghiệm (Beginner, Intermediate, Advanced, Expert)
- **years**: Số năm kinh nghiệm (ví dụ: "4 years")
- **projects**: Số dự án (ví dụ: "15+ projects")
- **description**: Mô tả ngắn về skill
- **category**: Category mà skill này thuộc về

## Cách sử dụng

### 1. Chạy seed data
```bash
npm run seed
```

Lệnh này sẽ tạo ra:
- 4 skill categories (Frontend, Backend, Database, UI/UX & Tools)
- 20 skills với đầy đủ thông tin như dữ liệu bạn cung cấp

### 2. Truy cập Admin Panel
- Vào `/admin` để quản lý dữ liệu
- Tìm "Skill Categories" và "Skills" trong menu

### 3. Sử dụng trong Frontend

#### Cách 1: Sử dụng dữ liệu theo format gốc của bạn
```tsx
import { SkillsDisplay, fetchSkillsInOriginalFormat } from '@/examples/skills-original-format'

const MySkillsPage = () => {
  const [skillCategories, setSkillCategories] = useState([])
  
  useEffect(() => {
    fetchSkillsInOriginalFormat().then(setSkillCategories)
  }, [])
  
  return <SkillsDisplay skillCategories={skillCategories} />
}
```

#### Cách 2: Sử dụng dữ liệu trực tiếp từ API
```typescript
// Lấy dữ liệu theo format gốc (với icon là JSX component)
const response = await fetch('/api/skills/formatted')
const skillCategories = await response.json()

// Lấy dữ liệu với giới hạn số lượng skills
const response = await fetch('/api/skills/formatted-with-limit?limit=50')
const { data: skillCategories, totalSkills, hasMore } = await response.json()

// Lấy tất cả dữ liệu (sử dụng pagination)
const response = await fetch('/api/skills/formatted-all')
const { data: skillCategories, totalSkills } = await response.json()

// Lấy tất cả skill categories với skills (format Payload CMS)
const response = await fetch('/api/skill-categories?depth=2&populate=skills')
const data = await response.json()

// Lấy skills theo category
const response = await fetch('/api/skills?where[category][equals]=CATEGORY_ID')
const skills = await response.json()
```

#### Cách 3: Sử dụng dữ liệu static
```tsx
import { skillCategories } from '@/examples/skills-original-format'

// Sử dụng trực tiếp dữ liệu static
<SkillsDisplay skillCategories={skillCategories} />
```

## Dữ liệu mẫu được tạo

### Frontend Development
- React.js (Expert, 4 years, 15+ projects)
- Next.js (Advanced, 3.5 years, 12+ projects)
- TypeScript (Advanced, 3 years, 10+ projects)
- Tailwind CSS (Advanced, 2.5 years, 8+ projects)
- HTML/CSS/JS (Expert, 4 years, 20+ projects)
- Angular (Intermediate, 1 year, 3+ projects)

### Backend Development
- Node.js (Intermediate, 1 year, 5+ projects)
- Express.js (Intermediate, 1 year, 4+ projects)
- NestJS (Intermediate, 1 year, 3+ projects)
- .NET (Beginner, 6 months, 2+ projects)

### Database & Storage
- MySQL (Intermediate, 1 year, 6+ projects)
- MongoDB (Intermediate, 8 months, 4+ projects)
- PostgreSQL (Beginner, 6 months, 2+ projects)

### UI/UX & Tools
- PrimeNG (Advanced, 2 years, 8+ projects)
- Material-UI (Advanced, 1.5 years, 6+ projects)
- Ant Design (Intermediate, 1 year, 4+ projects)
- Figma (Intermediate, 1 year, 5+ projects)
- Git (Advanced, 3 years, 20+ projects)

## Tùy chỉnh

### Thêm skill category mới:
1. Vào Admin Panel > Skill Categories > Create New
2. Điền thông tin: title, icon, color
3. Lưu và thêm skills vào category

### Thêm skill mới:
1. Vào Admin Panel > Skills > Create New
2. Điền thông tin: name, experience, years, projects, description
3. Chọn category phù hợp
4. Lưu

### Tùy chỉnh icon:
- Icon được lưu dưới dạng string (tên component)
- Sử dụng Lucide React icons
- Cập nhật `iconMap` trong component để thêm icon mới

## API Endpoints

### Payload CMS Endpoints
- `GET /api/skill-categories` - Lấy tất cả categories
- `GET /api/skill-categories/:id` - Lấy category theo ID
- `GET /api/skills` - Lấy tất cả skills
- `GET /api/skills/:id` - Lấy skill theo ID
- `GET /api/skills?where[category][equals]=:categoryId` - Lấy skills theo category

### Formatted Endpoints (Trả về theo format gốc)
- `GET /api/skills/formatted` - Lấy dữ liệu theo format gốc của bạn (icon là string, cần convert thành JSX)
- `GET /api/skills/formatted-with-limit?limit=50` - Lấy dữ liệu với giới hạn số lượng skills
- `GET /api/skills/formatted-all` - Lấy tất cả dữ liệu (sử dụng pagination)

## Demo Component

Sử dụng component demo để test các cách khác nhau:

```tsx
import { SkillsDemo } from '@/examples/demo-usage'

// Component này cho phép bạn:
// 1. Sử dụng dữ liệu static (immediate)
// 2. Load dữ liệu từ CMS (dynamic)
// 3. Xem code examples
<SkillsDemo />
```

## Lưu ý

- Dữ liệu được seed tự động khi chạy `npm run seed`
- Types được generate tự động khi thay đổi collections
- Component example sử dụng Tailwind CSS cho styling
- Có thể tùy chỉnh UI theo nhu cầu của bạn
- Icon được lưu dưới dạng string trong CMS, cần convert thành JSX component khi sử dụng
