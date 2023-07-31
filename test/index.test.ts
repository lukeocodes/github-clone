import { cloneRepo } from "../src";
import { assert, expect } from "chai";

describe("testing the clone repo functionality", () => {
  it("it should import the cloneRepo package", () => {
    expect(cloneRepo).is.not.undefined;
  });

  it("it should not throw an error when cloning a repo from org/repo string", async () => {
    expect(await cloneRepo({ repo: "lukeocodes/github-clone" })).to.not.throw;
  });

  it("it should not throw an error when cloning a repo from github.com url", async () => {
    expect(await cloneRepo({ repo: "https://github.com/lukeocodes/github-clone" })).to.not.throw;
  });

  it("it should not throw an error when cloning a repo from github.com ssh address", async () => {
    expect(await cloneRepo({ repo: "git@github.com:lukeocodes/github-clone.git" })).to.not.throw;
  });
});
