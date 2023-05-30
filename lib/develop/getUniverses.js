// Includes
const getPageResults = require('../util/getPageResults.js').func

// Args
exports.optional = ['isArchived', 'limit', 'sortOrder', 'jar']

// Docs
/**
 * 🔐 Gets a list of universes for the authenticated user.
 * @category User
 * @alias getUniverses
 * @param {boolean} [isArchived=false] - Whether or not to return archived games.
 * @param {number} [limit=10] - The amount of badges being returned each request.
 * @param {SortOrder=} [sortOrder=Asc] - The order that the data will be returned in (Asc or Desc)
 * @returns {Promise<Array<UniverseInfomation>>}
 * @example const noblox = require("noblox.js")
 * const universes = noblox.getUniverses(false, 10, "Asc")
**/

exports.func = async (args) => {
  return getPageResults({
    jar: args.jar,
    url: `//develop.roblox.com/v1/user/universes`,
    isArchived: args.isArchived,
    sortOrder: args.sortOrder,
    limit: args.limit
  })
}
