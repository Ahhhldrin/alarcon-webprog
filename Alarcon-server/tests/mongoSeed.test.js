const test = require("node:test");
const assert = require("node:assert/strict");
const bcrypt = require("bcryptjs");

const {
  buildSeedUserRecord,
  seedCollectionByKey,
} = require("../data/mongoSeed");

test("buildSeedUserRecord hashes a plain text seed password", async () => {
  const record = await buildSeedUserRecord({
    email: "alarcon.ahldrin@alarcon.dev",
    password: "devdrin",
  });

  assert.notEqual(record.password, "devdrin");
  assert.equal(await bcrypt.compare("devdrin", record.password), true);
});

test("buildSeedUserRecord keeps an already hashed password intact", async () => {
  const hashed = await bcrypt.hash("devdrin", 10);
  const record = await buildSeedUserRecord({
    email: "alarcon.ahldrin@alarcon.dev",
    password: hashed,
  });

  assert.equal(record.password, hashed);
});

test("seedCollectionByKey upserts by unique key without duplicates", async () => {
  const writes = [];
  const fakeModel = {
    updateOne: async (filter, update, options) => {
      writes.push({ filter, update, options });
      return { acknowledged: true };
    },
  };

  await seedCollectionByKey(fakeModel, "email", [
    { email: "one@example.com", password: "a" },
    { email: "two@example.com", password: "b" },
  ]);

  assert.equal(writes.length, 2);
  assert.deepEqual(writes[0].filter, { email: "one@example.com" });
  assert.deepEqual(writes[1].filter, { email: "two@example.com" });
  assert.equal(writes[0].options.upsert, true);
  assert.deepEqual(writes[0].update.$set.email, "one@example.com");
});
