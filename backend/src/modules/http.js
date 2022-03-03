module.exports = {
  generic(res, payload) {
    return res.status(payload.statusCode).json(payload.body);
  },

  ok(res, body) {
    if (res) {
      return res.status(200).json(body);
    } else {
      return {
        statusCode: 200,
        body: body,
      };
    }
  },

  created(res, body) {
    if (res) {
      return res.status(201).json(body);
    } else {
      return {
        statusCode: 201,
        body: body,
      };
    }
  },

  badRequest(res, body) {
    if (res) {
      return res.status(400).json(body);
    } else {
      return {
        statusCode: 400,
        body: body,
      };
    }
  },

  unauthorized(res, body) {
    if (res) {
      return res.status(401).json(body);
    } else {
      return {
        statusCode: 401,
        body: body,
      };
    }
  },

  forbidden(res, body) {
    if (res) {
      return res.status(403).json(body);
    } else {
      return {
        statusCode: 403,
        body: body,
      };
    }
  },

  notFound(res, body) {
    if (res) {
      return res.status(404).json(body);
    } else {
      return {
        statusCode: 404,
        body: body,
      };
    }
  },

  failure(res, body) {
    if (res) {
      return res.status(500).json(body);
    } else {
      return {
        statusCode: 500,
        body: body,
      };
    }
  },
};
