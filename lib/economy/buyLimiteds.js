// Includes
const crypto = require('crypto');
const http = require('../util/http.js').func
const getGeneralToken = require('../util/getGeneralToken.js').func

// Args
exports.required = [
  'collectibleItemId',
  'collectibleItemInstanceId',
  'collectibleProductId',
  'expectedCurrency',
  'expectedPrice',
  'expectedPurchaserId',
  'expectedSellerId'
]
exports.optional = ['jar']

// Docs
/**
 * 🔐 Get items details under the current user.
 * @category ecomony
 * @alias buyLimiteds
 * @param {string} collectibleItemId 
 * @param {string} collectibleItemInstanceId 
 * @param {string} collectibleProductId 
 * @param {number} expectedCurrency
 * @param {number} expectedPrice 
 * @param {number} expectedPurchaserId
 * @param {number} expectedSellerId 
 * @returns {Promise<BuyLimitedsResult>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.buyLimiteds(...)
**/

// Define
function buyLimiteds(collectibleItemId, collectibleItemInstanceId, collectibleProductId, expectedCurrency, expectedPrice, expectedPurchaserId, expectedSellerId, jar, token) {
  return new Promise((resolve, reject) => {
    return http({
      url: `//apis.roblox.com/marketplace-sales/v1/item/${collectibleItemId}/purchase-resale`,
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        json: {
          collectibleItemId,
          collectibleItemInstanceId,
          collectibleProductId,
          expectedCurrency,
          expectedPrice,
          expectedPurchaserId,
          expectedPurchaserType: 'User',
          expectedSellerId,
          expectedSellerType: 'User',
          idempotencyKey : crypto.randomUUID()
        },
        resolveWithFullResponse: true
      }
    }).then(({ statusCode, body }) => {
      if (statusCode === 200) {
        resolve(body)
      } else if (body && body.errors) {
        reject(new Error(`[${statusCode}] ${body.errors[0].message}, ${body.errors.field ? ` | ${body.errors.field} is incorrect` : ''}`))
      } else {
        reject(new Error(`An unknown error occurred with buyLimiteds | [${statusCode}]`))
      }
    }).catch(error => reject(error))
  })
}

exports.func = function ({ collectibleItemId, collectibleItemInstanceId, collectibleProductId, expectedCurrency, expectedPrice, expectedPurchaserId, expectedSellerId, jar }) {
  return getGeneralToken({ jar })
    .then((token) => {
      return buyLimiteds(collectibleItemId, collectibleItemInstanceId, collectibleProductId, expectedCurrency, expectedPrice, expectedPurchaserId, expectedSellerId, jar, token)
    })
}
