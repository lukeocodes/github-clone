import { cloneRepo } from "../src";
import { expect } from "chai";
import { Octokit } from "@octokit/rest";
import { rimraf } from "rimraf";

describe("testing the clone repo functionality", () => {
  it("it should import the cloneRepo package", () => {
    expect(cloneRepo).is.not.undefined;
  });

  it("it should not throw an error when cloning a repo from org/repo string", async () => {
    expect(
      await cloneRepo({
        repo: "git@github.com:lukeocodes/github-clone.git",
        dest: "./test/dump/clone",
        clean: true,
      })
    ).to.not.throw;

    rimraf("./test/dump"); // clean up
  });

  it("it should not throw an error when forking and cloning a repo", async () => {
    expect(
      await cloneRepo({
        repo: "git@github.com:zpqrtbnk/test-repo.git",
        dest: "./test/dump/fork",
        clean: true,
        fork: true,
      })
    ).to.not.throw;

    const octokit = new Octokit({
      auth: process.env.GITHUB_PAT,
    });

    await octokit.rest.repos.delete({
      owner: "lukeocodes", // user the test token is from
      repo: "test-repo",
    });

    rimraf("./test/dump"); // clean up
  });
});
