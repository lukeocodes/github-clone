import { GITHUB_DOMAIN } from "../constants";
import parse from "git-url-parse";
import pingUrl from "./pingUrl";

const getGitHubUrl = async (repo: string): Promise<string> => {
  if (!/(github\.com)/.test(repo) && !/^([\w-\.]+)\/([\w-\.]+)$/.test(repo)) {
    throw new Error("That doesn't appear to be a valid GitHub address or org/repo name");
  }

  try {
    const { full_name } = parse(repo);
    const url = `${GITHUB_DOMAIN}${full_name}`;

    if (!(await pingUrl(url))) {
      throw new Error("The repo does not exist as a public repository on github.com");
    }

    return url;
  } catch (e) {
    if (e instanceof Error)
      throw new Error("Could not parse string into a github.com URL" + e.stack);

    throw e;
  }
};

export default getGitHubUrl;
