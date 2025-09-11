import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Fetch skill categories (sorted by creation time, oldest first)
    const skillCategories = await payload.find({
      collection: 'skill-categories',
      depth: 0,
      sort: 'createdAt', // Sort by creation time, oldest first
    })

    // Fetch all skills with their categories (no pagination limit, sorted by creation time)
    const allSkills = await payload.find({
      collection: 'skills',
      depth: 1,
      limit: 0, // Get all skills without pagination
      sort: 'createdAt', // Sort by creation time, oldest first
    })

    // Format data to match your original structure
    const formattedData = skillCategories.docs.map((category: any) => {
      // Map icon string to JSX component
      const iconMap: Record<string, string> = {
        Code: 'Code',
        Server: 'Server',
        Database: 'Database',
        Palette: 'Palette',
      }

      // Find skills that belong to this category
      const categorySkills = allSkills.docs.filter((skill: any) => {
        // Handle both populated and unpopulated category references
        const skillCategoryId = skill.category?.id || skill.category
        return skillCategoryId === category.id
      })

      return {
        title: category.title,
        icon: iconMap[category.icon] || 'Code', // Return icon name for client-side rendering
        color: category.color,
        skills: categorySkills.map((skill: any) => ({
          name: skill.name,
          experience: skill.experience,
          years: skill.years,
          projects: skill.projects,
          description: skill.description,
        })),
      }
    })

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error('Error fetching formatted skills:', error)
    return NextResponse.json({ error: 'Failed to fetch skills data' }, { status: 500 })
  }
}
