import { GITHUB_DOMAIN } from "../constants";
import { Octokit } from "@octokit/rest";

const forkGitHubRepo = async (upstream: string): Promise<string> => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PAT,
  });

  const [owner, repo] = upstream.replace(GITHUB_DOMAIN, "").split("/");

  const fork = await octokit.rest.repos.createFork({
    owner,
    repo,
  });

  return fork.data.html_url;
};

export default forkGitHubRepo;
