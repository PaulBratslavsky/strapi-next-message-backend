"use strict";
const { nanoid } = require("nanoid");

/**
 *  message controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::message.message", ({ strapi }) => ({
  async find(ctx) {
    const entries = await strapi.entityService.findMany(
      "api::message.message",
      {
        sort: { createdAt: "DESC" },
        limit: 5,
      }
    );

    const sanitizedEntries = await this.sanitizeOutput(entries, ctx);
    return this.transformResponse(sanitizedEntries);
  },

  async create(ctx) {
    ctx.request.body.data = {
      ...ctx.request.body.data,
      uid: nanoid(),
      timesUpdated: 0,
    };

    // extends existing create controller
    const response = await super.create(ctx);
    return response;
  },

  async update(ctx) {
    const { id } = ctx.params;

    // find message based on id
    const entry = await strapi.entityService.findOne(
      "api::message.message",
      id
    );

    // delete data from request body
    delete ctx.request.body.data.uid;
    delete ctx.request.body.data.postedBy;

    // update the request body data
    ctx.request.body.data = {
      ...ctx.request.body.data,
      timesUpdated: entry.timesUpdated + 1,
    };

    // NOTE: you can update request body data directly and it is saved in ctx.

    // extended from existing update controller
    const response = await super.update(ctx);
    return response;
  },
}));
