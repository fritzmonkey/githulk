'use strict';

var debug = require('diagnostics')('githulk:organization');

/**
 * Organization API endpoint.
 *
 * @param {Mana} api The actual API instance.
 * @api private
 */
function Organization(api) {
  this.send = api.send.bind(api);
  this.api = api;
}

/**
 * Get organization information for a given org.
 *
 * @param {String} project The project details.
 * @param {Object} options Optional options.
 * @param {function} fn The callback.
 * @returns {Assign}
 * @api public
 */
Organization.prototype.get = function get(args) {
  args = this.api.args(arguments);

  var project = this.api.project(args.str) || {};

  return this.send(
    ['orgs', project.user || args.str],
    this.api.options(args.options || {}),
    args.fn
  );
};

/**
 * List all organizations for the authenticated user.
 *
 * @param {Object} options Optional options.
 * @param {function} fn The callback.
 * @returns {Assign}
 * @api public
 */
Organization.prototype.list = function list(args) {
  args = this.api.args(arguments);

  return this.send(
    ['user', 'orgs'],
    this.api.options(args.options || {}),
    args.fn
  );
};

/**
 * Get public member information for a given org.
 *
 * @param {String} project The project details.
 * @param {Object} options Optional options.
 * @param {function} fn The callback.
 * @returns {Assign}
 * @api public
 */
Organization.prototype.publicMembers = function publicMembers(args) {
  args = this.api.args(arguments);

  var project = this.api.project(args.str) || {};

  return this.send(
    ['orgs', project.user || args.str, 'public_members'],
    this.api.options(args.options || {}),
    args.fn
  );
};

//
// Expose the organization API.
//
module.exports = Organization;
