import React from 'react'
import {
  SkillsDisplay,
  fetchSkillsInOriginalFormat,
  skillCategories,
} from './skills-original-format'

/**
 * Demo component showing different ways to use skill categories data
 */
export const SkillsDemo = () => {
  const [dynamicData, setDynamicData] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(false)
  const [useStatic, setUseStatic] = React.useState(true)

  const loadDynamicData = async () => {
    setLoading(true)
    try {
      const data = await fetchSkillsInOriginalFormat()
      setDynamicData(data)
      setUseStatic(false)
    } catch (error) {
      console.error('Error loading dynamic data:', error)
    } finally {
      setLoading(false)
    }
  }

  const useStaticData = () => {
    setUseStatic(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Skills Demo</h1>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={useStaticData}
          className={`px-4 py-2 rounded ${
            useStatic ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Use Static Data
        </button>
        <button
          onClick={loadDynamicData}
          disabled={loading}
          className={`px-4 py-2 rounded ${
            !useStatic ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Loading...' : 'Load from CMS'}
        </button>
      </div>

      {/* Data Source Info */}
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Currently showing: <strong>{useStatic ? 'Static Data' : 'Dynamic Data from CMS'}</strong>
        </p>
        {!useStatic && dynamicData.length > 0 && (
          <p className="text-sm text-gray-500">
            Loaded {dynamicData.length} categories with{' '}
            {dynamicData.reduce((total, cat) => total + cat.skills.length, 0)} skills
          </p>
        )}
      </div>

      {/* Skills Display */}
      {useStatic ? (
        <SkillsDisplay skillCategories={skillCategories} />
      ) : loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Loading skills from CMS...</p>
          </div>
        </div>
      ) : (
        <SkillsDisplay skillCategories={dynamicData} />
      )}

      {/* Code Examples */}
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Code Examples</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">1. Using Static Data (Immediate)</h3>
            <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
              {`import { skillCategories, SkillsDisplay } from '@/examples/skills-original-format'

const MyComponent = () => (
  <SkillsDisplay skillCategories={skillCategories} />
)`}
            </pre>
          </div>

          <div>
            <h3 className="font-medium mb-2">2. Loading from CMS (Dynamic)</h3>
            <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
              {`import { fetchSkillsInOriginalFormat, SkillsDisplay } from '@/examples/skills-original-format'

const MyComponent = () => {
  const [skills, setSkills] = useState([])
  
  useEffect(() => {
    fetchSkillsInOriginalFormat().then(setSkills)
  }, [])
  
  return <SkillsDisplay skillCategories={skills} />
}`}
            </pre>
          </div>

          <div>
            <h3 className="font-medium mb-2">3. Direct API Call</h3>
            <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
              {`// Fetch formatted data from API
const response = await fetch('/api/skills/formatted')
const skillCategories = await response.json()

// Convert icon names to JSX components
const iconMap = { Code, Server, Database, Palette }
const formattedData = skillCategories.map(cat => ({
  ...cat,
  icon: React.createElement(iconMap[cat.icon], { className: "w-8 h-8" })
}))`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
