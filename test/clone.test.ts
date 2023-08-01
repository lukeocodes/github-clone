import { cloneRepo } from "../src";
import { expect } from "chai";
import { rimraf } from "rimraf";

describe("testing the clone repo functionality", () => {
  it("it should import the cloneRepo package", () => {
    expect(cloneRepo).is.not.undefined;
  });

  it("it should not throw an error when cloning a repo from org/repo string", async () => {
    rimraf("./test/clone-test"); // clean up

    expect(
      await cloneRepo({
        repo: "git@github.com:lukeocodes/github-clone.git",
        dest: "./test/clone-test",
        clean: true,
      })
    ).to.not.throw;

    rimraf("./test/clone-test"); // clean up
  });
});
