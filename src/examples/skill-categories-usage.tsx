import React from 'react'
import { Code, Server, Database, Palette } from 'lucide-react'

// Example component showing how to use the skill categories data
// This is similar to your original data structure but now managed through Payload CMS

interface Skill {
  id: string
  name: string
  experience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  years: string
  projects: string
  description: string
  category: string | { id: string; title: string }
}

interface SkillCategory {
  id: string
  title: string
  icon: string
  color: string
  slug: string
  skills: Skill[]
}

interface SkillCategoriesProps {
  skillCategories: SkillCategory[]
}

// Icon mapping for dynamic icon rendering
const iconMap = {
  Code: Code,
  Server: Server,
  Database: Database,
  Palette: Palette,
}

export const SkillCategoriesComponent: React.FC<SkillCategoriesProps> = ({ skillCategories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {skillCategories.map((category) => {
        const IconComponent = iconMap[category.icon as keyof typeof iconMap]

        return (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
          >
            {/* Category Header */}
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} text-white mr-4`}>
                {IconComponent && <IconComponent className="w-6 h-6" />}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{category.title}</h3>
            </div>

            {/* Skills List */}
            <div className="space-y-3">
              {category.skills.map((skill) => (
                <div key={skill.id} className="border-l-4 border-blue-500 pl-4 py-2">
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
        )
      })}
    </div>
  )
}

// Example of how to fetch data from Payload CMS
export const fetchSkillCategories = async (): Promise<SkillCategory[]> => {
  try {
    const response = await fetch('/api/skill-categories?depth=2&populate=skills')
    const data = await response.json()

    return data.docs.map((category: any) => ({
      id: category.id,
      title: category.title,
      icon: category.icon,
      color: category.color,
      slug: category.slug,
      skills: category.skills || [],
    }))
  } catch (error) {
    console.error('Error fetching skill categories:', error)
    return []
  }
}

// Example usage in a page component
export const SkillsPage = () => {
  const [skillCategories, setSkillCategories] = React.useState<SkillCategory[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const data = await fetchSkillCategories()
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
      <SkillCategoriesComponent skillCategories={skillCategories} />
    </div>
  )
}
