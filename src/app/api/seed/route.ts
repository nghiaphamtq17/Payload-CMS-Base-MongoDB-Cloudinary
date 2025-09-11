import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { seed } from '@/endpoints/seed'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Create a mock request object for the seed function
    const mockReq = {
      user: null,
      headers: new Headers(),
      payload,
    } as any

    await seed({ payload, req: mockReq })

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully!',
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to seed database',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
