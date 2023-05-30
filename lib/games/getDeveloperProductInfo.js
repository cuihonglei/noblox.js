// Includes
const http = require('../util/http').func

// Args
exports.required = ['productId']
exports.optional = ['jar']

// Docs
/**
 * 🔐 Get a developer product info for the authenticated user.
 * @category Game
 * @alias getDeveloperProductInfo
 * @param {number} productId - The id of the asset.
 * @returns {Promise<DeveloperProductInfo>}
 * @example const noblox = require("noblox.js")
 * const productInfo = noblox.getDeveloperProductInfo(1)
**/

// Define
const getDeveloperProductInfo = async (productId, jar) => {
  return http({
    url: `//apis.roblox.com/developer-products/v1/developer-products/${productId}`,
    options: {
      resolveWithFullResponse: true,
      method: 'GET',
      jar: jar
    }
  }).then(({ body, statusCode }) => {
    const { errors } = JSON.parse(body)
    if (statusCode === 200) {
      try {
        const productInfo = JSON.parse(body)
        productInfo['created'] = new Date(productInfo['created'])
        productInfo['updated'] = new Date(productInfo['updated'])
        return productInfo
      } catch (err) {
        throw new Error(`An unknown error occurred with getDeveloperProductInfo() | [${statusCode}] productId: ${productId}`)
      }
    } else if (statusCode === 400) {
      throw new Error(`${errors[0].message} | productId: ${assetId}`)
    } else {
      throw new Error(`An unknown error occurred with getDeveloperProductInfo() | [${statusCode}] productId: ${productId}`)
    }
  })
}

exports.func = function ({ productId, jar }) {
  if (isNaN(productId)) {
    throw new Error('The provided productId is not a number.')
  }
  return getDeveloperProductInfo(productId, jar);
}
