import { CloneRepoOptions } from "./lib/types/CloneRepoOptions";
import { rimraf } from "rimraf";
import clone from "git-clone/promise";
import forkGitHubRepo from "./lib/utils/forkGitHubRepo";
import getGitHubUrl from "./lib/utils/getGitHubUrl";

const cloneRepo = async ({ repo, dest = "./", ...opts }: CloneRepoOptions): Promise<void> => {
  let url = await getGitHubUrl(repo);

  const { fork } = opts;

  if (fork) {
    if (!process.env.GITHUB_PAT) {
      throw new Error(
        `To fork a repo, \`GITHUB_PAT\` must be set in your environment variables with a
Personal Access token. Visit https://github.com/settings/tokens/new to create a new Personal 
Access Token.`
      );
    }

    url = await forkGitHubRepo(url, opts.forkOptions);
  }

  const { clean } = opts;

  if (clean) {
    await rimraf(dest);
  }

  await clone(url, dest, opts);
};

export { cloneRepo };
