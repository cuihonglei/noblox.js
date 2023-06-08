// Includes
const http = require('../util/http.js').func
const getGeneralToken = require('../util/getGeneralToken.js').func

// Args
exports.required = ['collectibleItemId', 'ownerId']
exports.optional = ['jar']

// Docs
/**
 * 🔐 Get items details under the current user.
 * @category Develop
 * @alias getResellableInstances
 * @param {number} collectibleItemId - The userId of the items
 * @param {number} ownerId - The ower of the item
 * @returns {Promise<Array<InstanceDetails>>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * noblox.getResellableInstances('9f992ce6-5515-4228-ad4e-95d3e7190bb2', 123)
**/

// Define
function getResellableInstances(collectibleItemId, ownerId, jar, token) {
  return new Promise((resolve, reject) => {
    return http({
      url: `//apis.roblox.com/marketplace-sales/v1/item/${collectibleItemId}/resellable-instances?ownerType=User&ownerId=${ownerId}&limit=500`,
      options: {
        method: 'GET',
        jar,
        headers: {
          'X-CSRF-TOKEN': token
        },
        resolveWithFullResponse: true
      }
    }).then(({ statusCode, body }) => {
      if (statusCode === 200) {
        resolve(JSON.parse(body).itemInstances)
      } else if (body && body.errors) {
        reject(new Error(`[${statusCode}] ${body.errors[0].message}, ${body.errors.field ? ` | ${body.errors.field} is incorrect` : ''}`))
      } else {
        reject(new Error(`An unknown error occurred with getItemsDetails() | [${statusCode}]`))
      }
    }).catch(error => reject(error))
  })
}

exports.func = function ({ collectibleItemId, ownerId, jar }) {
  return getGeneralToken({ jar })
    .then((token) => {
      return getResellableInstances(collectibleItemId, ownerId, jar, token)
    })
}
