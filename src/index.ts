// import gitclone from "git-clone";
import parse from "git-url-parse";
import { CloneRepoOptions } from "./types/CloneRepoOptions";
import { request } from "https";
// import rimraf from "rimraf";

const pingUrl = async (ping: string): Promise<boolean> => {
  const url = new URL(ping);

  const { host, pathname } = url;
  const opt = { method: "HEAD", host, path: pathname, timeout: 2000 };

  return new Promise((resolve) => {
    const req = request(opt, (r) => resolve(/4\d\d/.test(`${r.statusCode}`) === false));

    req.on("timeout", () => {
      req.destroy();
    });

    req.on("error", () => resolve(false));
    req.end();
  });
};

const cloneRepo = async ({ repo, dest = "./", ...opts }: CloneRepoOptions): Promise<void> => {
  let url;

  if (!/(github\.com)/.test(repo) && !/^([\w-\.]+)\/([\w-\.]+)$/.test(repo)) {
    throw new Error("That doesn't appear to be a valid GitHub address or org/repo name");
  }

  try {
    const { full_name } = parse(repo);
    url = `https://github.com/${full_name}`;

    if (!(await pingUrl(url))) {
      throw new Error("The repo does not exist as a public repository on github.com");
    }
  } catch (e) {
    if (e instanceof Error)
      throw new Error("Could not parse string into a github.com URL" + e.stack);

    throw e;
  }

  const { fork } = opts;

  if (fork && !process.env.GITHUB_TOKEN) {
    throw new Error("To fork a repo, `GITHUB_TOKEN` must be set in your environment variables");
  }

  console.log(url);

  return;
};

export { cloneRepo };
