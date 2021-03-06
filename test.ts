
import optimisticP from "./index";

test("works", () => {
  return optimisticP(
    [
      Promise.resolve("a"),
    ]
  )
    .then((values) => t.includes(values, ["a"]));
});

test("works", () => {
  return optimisticP(
    [
      Promise.resolve("a"),
      Promise.reject(new Error("b")),
    ]
  )
    .then((values) => t.includes(values, ["a"]));
});

test("works", () => {
  return optimisticP(
    [
      Promise.resolve("a"),
      Promise.resolve("c"),
    ]
  )
    .then((values) => t.includes(values, ["a", "c"]));
});

test("works", () => {
  return optimisticP(
    [
      Promise.resolve("a"),
      Promise.reject(new Error("b")),
      Promise.resolve("c"),
    ]
  )
    .then((values) => t.includes(values, ["a", "c"]));
});
