import React from 'react'
import { Code, Server, Database, Palette } from 'lucide-react'

// Icon mapping for dynamic icon rendering
const iconMap = {
  Code: Code,
  Server: Server,
  Database: Database,
  Palette: Palette,
}

// Types from Payload CMS
interface PayloadSkill {
  id: string
  name: string
  experience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  years: string
  projects: string
  description: string
  category: string | { id: string; title: string }
}

interface PayloadSkillCategory {
  id: string
  title: string
  icon: string
  color: string
  slug: string
  skills: PayloadSkill[]
}

// Your original format
interface OriginalSkill {
  name: string
  experience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  years: string
  projects: string
  description: string
}

interface OriginalSkillCategory {
  title: string
  icon: React.ReactElement
  color: string
  skills: OriginalSkill[]
}

/**
 * Convert Payload CMS data to your original format
 */
export const formatSkillCategories = (
  payloadData: PayloadSkillCategory[],
): OriginalSkillCategory[] => {
  return payloadData.map((category) => {
    const IconComponent = iconMap[category.icon as keyof typeof iconMap]

    return {
      title: category.title,
      icon: IconComponent
        ? React.createElement(IconComponent, { className: 'w-8 h-8' })
        : React.createElement(Code, { className: 'w-8 h-8' }),
      color: category.color,
      skills: category.skills.map((skill) => ({
        name: skill.name,
        experience: skill.experience,
        years: skill.years,
        projects: skill.projects,
        description: skill.description,
      })),
    }
  })
}

/**
 * Fetch and format skill categories from Payload CMS
 */
export const getFormattedSkillCategories = async (): Promise<OriginalSkillCategory[]> => {
  try {
    const response = await fetch('/api/skill-categories?depth=2&populate=skills')
    const data = await response.json()

    return formatSkillCategories(data.docs)
  } catch (error) {
    console.error('Error fetching skill categories:', error)
    return []
  }
}

/**
 * Static data in your original format (for fallback or direct use)
 */
export const skillCategories = [
  {
    title: 'Frontend Development',
    icon: <Code className="w-8 h-8" />,
    color: 'from-blue-500 to-indigo-600',
    skills: [
      {
        name: 'React.js',
        experience: 'Expert',
        years: '4 years',
        projects: '15+ projects',
        description: 'Building scalable web applications',
      },
      {
        name: 'Next.js',
        experience: 'Advanced',
        years: '3.5 years',
        projects: '12+ projects',
        description: 'Full-stack React framework',
      },
      {
        name: 'TypeScript',
        experience: 'Advanced',
        years: '3 years',
        projects: '10+ projects',
        description: 'Type-safe development',
      },
      {
        name: 'Tailwind CSS',
        experience: 'Advanced',
        years: '2.5 years',
        projects: '8+ projects',
        description: 'Utility-first CSS framework',
      },
      {
        name: 'HTML/CSS/JS',
        experience: 'Expert',
        years: '4 years',
        projects: '20+ projects',
        description: 'Core web technologies',
      },
      {
        name: 'Angular',
        experience: 'Intermediate',
        years: '1 year',
        projects: '3+ projects',
        description: 'Enterprise applications',
      },
    ],
  },
  {
    title: 'Backend Development',
    icon: <Server className="w-8 h-8" />,
    color: 'from-emerald-500 to-teal-600',
    skills: [
      {
        name: 'Node.js',
        experience: 'Intermediate',
        years: '1 year',
        projects: '5+ projects',
        description: 'Server-side JavaScript',
      },
      {
        name: 'Express.js',
        experience: 'Intermediate',
        years: '1 year',
        projects: '4+ projects',
        description: 'Web application framework',
      },
      {
        name: 'NestJS',
        experience: 'Intermediate',
        years: '1 year',
        projects: '3+ projects',
        description: 'Scalable server applications',
      },
      {
        name: '.NET',
        experience: 'Beginner',
        years: '6 months',
        projects: '2+ projects',
        description: 'Microsoft ecosystem',
      },
    ],
  },
  {
    title: 'Database & Storage',
    icon: <Database className="w-8 h-8" />,
    color: 'from-violet-500 to-purple-600',
    skills: [
      {
        name: 'MySQL',
        experience: 'Intermediate',
        years: '1 year',
        projects: '6+ projects',
        description: 'Relational database management',
      },
      {
        name: 'MongoDB',
        experience: 'Intermediate',
        years: '8 months',
        projects: '4+ projects',
        description: 'NoSQL document database',
      },
      {
        name: 'PostgreSQL',
        experience: 'Beginner',
        years: '6 months',
        projects: '2+ projects',
        description: 'Advanced SQL database',
      },
    ],
  },
  {
    title: 'UI/UX & Tools',
    icon: <Palette className="w-8 h-8" />,
    color: 'from-amber-500 to-orange-600',
    skills: [
      {
        name: 'PrimeNG',
        experience: 'Advanced',
        years: '2 years',
        projects: '8+ projects',
        description: 'Angular UI component library',
      },
      {
        name: 'Material-UI',
        experience: 'Advanced',
        years: '1.5 years',
        projects: '6+ projects',
        description: 'React component library',
      },
      {
        name: 'Ant Design',
        experience: 'Intermediate',
        years: '1 year',
        projects: '4+ projects',
        description: 'Enterprise UI design',
      },
      {
        name: 'Figma',
        experience: 'Intermediate',
        years: '1 year',
        projects: '5+ projects',
        description: 'UI/UX design tool',
      },
      {
        name: 'Git',
        experience: 'Advanced',
        years: '3 years',
        projects: '20+ projects',
        description: 'Version control system',
      },
    ],
  },
]
