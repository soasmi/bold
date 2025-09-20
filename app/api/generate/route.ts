import { NextRequest, NextResponse } from 'next/server'
import { CodeGenerationService } from '@/services/CodeGenerationService'

export async function POST(request: NextRequest) {
  try {
    const { description } = await request.json()

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      )
    }

    const codeGenerationService = new CodeGenerationService()
    const result = await codeGenerationService.generateCode(description)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error generating code:', error)
    return NextResponse.json(
      { error: 'Failed to generate code' },
      { status: 500 }
    )
  }
}
