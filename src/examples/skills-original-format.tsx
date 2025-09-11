import React from 'react'
import { Code, Server, Database, Palette } from 'lucide-react'

// Your original data structure
interface Skill {
  name: string
  experience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  years: string
  projects: string
  description: string
}

interface SkillCategory {
  title: string
  icon: React.ReactElement
  color: string
  skills: Skill[]
}

// Icon mapping
const iconMap = {
  Code: Code,
  Server: Server,
  Database: Database,
  Palette: Palette,
}

interface SkillsDisplayProps {
  skillCategories: SkillCategory[]
}

export const SkillsDisplay: React.FC<SkillsDisplayProps> = ({ skillCategories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {skillCategories.map((category, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          {/* Category Header */}
          <div className="flex items-center mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} text-white mr-4`}>
              {category.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{category.title}</h3>
          </div>

          {/* Skills List */}
          <div className="space-y-3">
            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">{skill.name}</h4>
                    <p className="text-sm text-gray-600">{skill.description}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      skill.experience === 'Expert'
                        ? 'bg-green-100 text-green-800'
                        : skill.experience === 'Advanced'
                          ? 'bg-blue-100 text-blue-800'
                          : skill.experience === 'Intermediate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {skill.experience}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{skill.years}</span>
                  <span>{skill.projects}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Function to fetch and format data from API
export const fetchSkillsInOriginalFormat = async (): Promise<SkillCategory[]> => {
  try {
    const response = await fetch('/api/skills/formatted')
    const data = await response.json()

    // Convert icon names to JSX components
    return data.map((category: any) => ({
      ...category,
      icon: React.createElement(iconMap[category.icon as keyof typeof iconMap] || Code, {
        className: 'w-8 h-8',
      }),
    }))
  } catch (error) {
    console.error('Error fetching skills:', error)
    return []
  }
}

// Static data in your original format (for direct use)
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

// Example usage component
export const SkillsPage = () => {
  const [skillCategories, setSkillCategories] = React.useState<SkillCategory[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const data = await fetchSkillsInOriginalFormat()
      setSkillCategories(data)
      setLoading(false)
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Skills</h1>
      <SkillsDisplay skillCategories={skillCategories} />
    </div>
  )
}
