import { GITHUB_DOMAIN } from "../constants";
import { Octokit } from "@octokit/rest";

const forkGitHubRepo = async (upstream: string, forkOptions?: {}): Promise<string> => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PAT,
  });

  const [owner, repo] = upstream.replace(GITHUB_DOMAIN, "").split("/");

  const fork = await octokit.rest.repos.createFork({
    owner,
    repo,
    ...forkOptions,
  });

  return fork.data.html_url;
};

export default forkGitHubRepo;
