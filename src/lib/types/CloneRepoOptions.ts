import type { Options } from "git-clone";

interface CloneRepoOptions extends Options {
  repo: string;
  dest?: string;
  fork?: boolean;
  clean?: boolean;
}

export type { CloneRepoOptions };
