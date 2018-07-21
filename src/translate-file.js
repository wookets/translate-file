
const fs = require('fs')
const translate = require('./translate')

async function translateFile (inFile, outFile, targetLanguage) {
	const json = fs.readFileSync(inFile, 'utf8')
	const output = await translate(JSON.stringify(json), 'en')
	fs.writeFileSync(outFile, output)
}

module.exports = translateFile
