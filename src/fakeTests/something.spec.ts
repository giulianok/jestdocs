import something from "./something";
const hi = test(
  'returns "che!"',
  () => {
    expect(something(15)).toBe("che!");
  },
  "something"
).withMetaData("something", {
    documentation: "this is some test docs",
    tags: ["tag1", "tag2"]
  });

test(
  'returns "blah"',
  () => {
    expect(something(7)).toBe("blah");
  }
);
