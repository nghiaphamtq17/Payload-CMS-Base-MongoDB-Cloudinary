import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ComponentDefinition {
  id: string
  name: string
  slug: string
  description?: string
  category: string
  icon?: string
  fields: Array<{
    name: string
    label?: string
    type: string
    required?: boolean
  }>
  isActive: boolean
}

interface DynamicComponentAdminProps {
  componentDefinitions: ComponentDefinition[]
  onComponentSelect?: (component: ComponentDefinition) => void
  onComponentCreate?: (component: ComponentDefinition) => void
  onComponentEdit?: (component: ComponentDefinition) => void
  onComponentDelete?: (componentId: string) => void
}

export const DynamicComponentAdmin: React.FC<DynamicComponentAdminProps> = ({
  componentDefinitions,
  onComponentSelect,
  onComponentCreate,
  onComponentEdit,
  onComponentDelete,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'layout', label: 'Layout' },
    { value: 'content', label: 'Content' },
    { value: 'media', label: 'Media' },
    { value: 'interactive', label: 'Interactive' },
    { value: 'navigation', label: 'Navigation' },
    { value: 'form', label: 'Form' },
    { value: 'custom', label: 'Custom' },
  ]

  const filteredComponents = componentDefinitions.filter((component) => {
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory
    const matchesSearch =
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch && component.isActive
  })

  const getCategoryColor = (category: string) => {
    const colors = {
      layout: 'bg-blue-100 text-blue-800',
      content: 'bg-green-100 text-green-800',
      media: 'bg-purple-100 text-purple-800',
      interactive: 'bg-orange-100 text-orange-800',
      navigation: 'bg-pink-100 text-pink-800',
      form: 'bg-yellow-100 text-yellow-800',
      custom: 'bg-gray-100 text-gray-800',
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getIcon = (iconName?: string) => {
    // This would be replaced with actual icon components
    return iconName ? `🔧` : '📦'
  }

  return (
    <div className="dynamic-component-admin p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Dynamic Components</h2>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Create New Component Button */}
        <Button onClick={() => onComponentCreate?.(null as any)} className="mb-4">
          + Create New Component
        </Button>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredComponents.map((component) => (
          <Card key={component.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getIcon(component.icon)}</span>
                <h3 className="font-semibold text-lg">{component.name}</h3>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(component.category)}`}
              >
                {component.category}
              </span>
            </div>

            {component.description && (
              <p className="text-gray-600 text-sm mb-3">{component.description}</p>
            )}

            <div className="mb-3">
              <p className="text-sm text-gray-500 mb-1">Fields ({component.fields.length}):</p>
              <div className="flex flex-wrap gap-1">
                {component.fields.slice(0, 3).map((field, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {field.name}
                  </span>
                ))}
                {component.fields.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    +{component.fields.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onComponentSelect?.(component)}>
                Use
              </Button>
              <Button variant="outline" size="sm" onClick={() => onComponentEdit?.(component)}>
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onComponentDelete?.(component.id)}
                className="text-red-600 hover:text-red-700"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredComponents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No components found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
