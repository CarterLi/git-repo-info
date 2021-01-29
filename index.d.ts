export default function getRepoInfo(cwd?: string): {
    branch: string;
    sha: string;
    abbreviatedSha: string;
    tag: string;
    lastTag: string;
    commitsSinceLastTag: number;
    committer: string;
    committerDate: string;
    author: string;
    authorDate: string;
    commitMessage: string;
};
