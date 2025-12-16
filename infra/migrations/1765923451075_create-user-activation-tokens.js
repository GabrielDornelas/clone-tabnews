exports.shorthands = undefined;


exports.up = (pgm) => {
  pgm.createTable("user_activation_tokens", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    used_at: {
      type: "timestampz",
      notNull: false,
    },

    user_id: {
      type: "uuid",
      notNull: true,
    },

    expires_at: {
      type: "timestampz",
      notNull: true,
    },

    created_at: {
      type: "timestampz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },

    updated_at: {
      type: "timestampz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    }
  })
};

exports.down = (pgm) => {};
