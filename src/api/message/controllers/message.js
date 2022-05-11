"use strict";

/**
 *  message controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::message.message", ({ strapi }) => ({
  async find(ctx) {
    const entities = strapi.entityService.findMany("app::message.message", {
      sort: { createdAt: "DESC" },
      limit: ctx.query.limit || 5,
    });

    console.log(this, "################ THIS #####################");

    const sanitizedEntries = await this.sanitizedOutput(entities, ctx);
    
    return this.transformResponse(sanitizedEntries);

  },

  async create(ctx) {},

  async update(ctx) {},
}));
