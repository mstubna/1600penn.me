const fs = require('fs')

const file = fs.readFileSync('../generated_text.txt', 'utf-8')

const chunks = file
  .split('====================')
  .map((chunk) => chunk.trim())
  .filter((chunk) => chunk.length > 0)

fs.writeFileSync(
  '../parsed_text.json',
  JSON.stringify({ data: chunks }, null, '\t')
)
