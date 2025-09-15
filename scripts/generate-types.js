#!/usr/bin/env node

/**
 * Script to generate Payload types after adding new collections
 * Run this after adding new collections to ensure types are up to date
 */

const { execSync } = require('child_process')
const path = require('path')

console.log('🔄 Generating Payload types...')

try {
  // Change to project root directory
  const projectRoot = path.resolve(__dirname, '..')
  process.chdir(projectRoot)

  // Run payload generate:types command
  execSync('pnpm payload generate:types', {
    stdio: 'inherit',
    cwd: projectRoot,
  })

  console.log('✅ Payload types generated successfully!')
  console.log(
    '📝 You can now remove src/types/temp-types.ts and use generated types from @/payload-types',
  )
} catch (error) {
  console.error('❌ Error generating types:', error.message)
  console.log('💡 Make sure to run: pnpm install && pnpm dev first')
  process.exit(1)
}
