"use strict";

/**
 *  message controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::message.message", ({ strapi }) => ({
    async find(ctx) {
        // 1
        const entries = await strapi.entityService.findMany(
          'api::message.message',
          {
            sort: { createdAt: 'DESC' },
            limit: 5,
          }
        );
      
        console.log(this, "################## this ######################");
        // 2
        const sanitizedEntries = await this.sanitizeOutput(entries, ctx);
      
        // 3
        return this.transformResponse(sanitizedEntries);
      },

  async create(ctx) {
    // todo
  },

  async update(ctx) {
    // todo
  },
}));