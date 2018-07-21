
const fs = require('fs')
const through2 = require('through2')
const translate = require('./translate')

async function translateFile (inFile, outFile, targetLanguage) {
	let count = 0
	const inStream = fs.createReadStream(inFile, { highWaterMark: 1024 })
	const outStream = fs.createWriteStream(outFile)
	inStream
		.pipe(through2(function (chunk, enc, callback) {
			count = count + 1
			process.stdout.write(`translating chunk ${count}... `)
			translate(chunk.toString(), 'en')
				.then( result => {
					process.stdout.write(`writing chunk ${count} to file \n`)
					this.push(result)
					setTimeout(callback, 100)
				})
				.catch(console.log)
		}))
		.pipe(outStream)
		.on('finish', () => {
			console.log('All done!')
		})
}

module.exports = translateFile
