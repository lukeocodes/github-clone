import { cloneRepo } from "../src";
import { expect } from "chai";

describe("testing the clone repo functionality", () => {
  it("it should import the cloneRepo package", () => {
    expect(cloneRepo).is.not.undefined;
    expect(cloneRepo({ repo: "lukeocodes/github-clone" })).is.empty;
  });
});
