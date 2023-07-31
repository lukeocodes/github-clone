// import gitclone from "git-clone";
import parse from "git-url-parse";
import { CloneRepoOptions } from "./types/CloneRepoOptions";
// import rimraf from "rimraf";

const cloneRepo = ({ repo, dest = "./", ...opts }: CloneRepoOptions): void => {
  let url;

  try {
    const { full_name } = parse(repo);
    url = `https://github.com/${full_name}`;
  } catch (e) {
    throw new Error("Could not parse string into github.com URL");
  }

  const { fork } = opts;

  if (fork && !process.env.GITHUB_TOKEN) {
    throw new Error("To fork a repo, `GITHUB_TOKEN` must be set in your environment variables");
  }

  console.log(url);

  return;
};

export { cloneRepo };
