// Includes
const http = require('../util/http.js').func
const getGeneralToken = require('../util/getGeneralToken.js').func

// Args
exports.required = ['items']
exports.optional = ['jar']

// Docs
/**
 * 🔐 Get items details under the current user.
 * @category Develop
 * @alias getItemsDetails
 * @param {number} userId - The userId of the items
 * @param {Array<Object>} items - The items' IDs, etc.
 * @returns {Promise<Array<ItemDetails>>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.getItemsDetails(2421261122, [{id: 13045122964, itemType: "Asset"}])
**/

// Define
function getItemsDetails(items, jar, token) {
  return new Promise((resolve, reject) => {
    return http({
      url: `//catalog.roblox.com/v1/catalog/items/details`,
      options: {
        method: 'POST',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        json: { items: items },
        resolveWithFullResponse: true
      }
    }).then(({ statusCode, body }) => {
      if (statusCode === 200) {
        resolve(body.data)
      } else if (body && body.errors) {
        reject(new Error(`[${statusCode}] ${body.errors[0].message}, ${body.errors.field ? ` | ${body.errors.field} is incorrect` : ''}`))
      } else {
        reject(new Error(`An unknown error occurred with getItemsDetails() | [${statusCode}]`))
      }
    }).catch(error => reject(error))
  })
}

exports.func = function ({ items, jar }) {
  return getGeneralToken({ jar })
    .then((token) => {
      return getItemsDetails(items, jar, token)
    })
}
