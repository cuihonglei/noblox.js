// Includes
const getPageResults = require('../util/getPageResults.js').func

// Args
exports.required = ['productId']
exports.optional = ['jar']

// Docs
/**
 * 🔐 Get a developer product info for the authenticated user.
 * @category User
 * @alias getDeveloperProductInfo
 * @param {number} productId
 * @returns {Promise<DeveloperProductInfo>}
 * @example const noblox = require("noblox.js")
 * const productInfo = noblox.getDeveloperProductInfo(1)
**/

exports.func = async (args) => {
  return getPageResults({
    jar: args.jar,
    url: `//apis.roblox.com/developer-products/v1/developer-products/${args.productId}`
  })
}
