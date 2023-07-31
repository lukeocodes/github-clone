import { cloneRepo } from "../src";
import { expect } from "chai";

describe("testing the clone repo functionality", () => {
  it("it should import the cloneRepo package", () => {
    expect(cloneRepo).is.not.undefined;
  });

  it("it should not throw an error when cloning a repo from org/repo string", () => {
    expect(() => cloneRepo({ repo: "lukeocodes/github-clone" })).to.not.throw;
  });

  it("it should not throw an error when cloning a repo from github.com url", () => {
    expect(() => cloneRepo({ repo: "https://github.com/lukeocodes/github-clone" })).to.not.throw;
  });

  it("it should not throw an error when cloning a repo from github.com ssh address", () => {
    expect(() => cloneRepo({ repo: "git@github.com:lukeocodes/github-clone.git" })).to.not.throw;
  });

  it("it should error when trying to clone a non-repo string", () => {
    expect(() => cloneRepo({ repo: "werwgwergwg" })).to.throw(
      "Could not parse string into github.com URL"
    );
  });
});
