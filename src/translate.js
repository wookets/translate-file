
const Translate = require('@google-cloud/translate')
const gctranslator = new Translate()

async function translate (text, target) {
	const result = await gctranslator.translate(text, target)
	return result[0]
}

module.exports = translate