// import gitclone from "git-clone";
import { CloneRepoOptions } from "./types/CloneRepoOptions";
// import rimraf from "rimraf";

const cloneRepo = ({ repo, dest = "./", ...opts }: CloneRepoOptions): void => {
  console.log(repo, dest, opts);
  return;
};

export { cloneRepo };
