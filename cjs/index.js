"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cp = require("child_process");
function getRepoInfo(cwd = process.cwd()) {
    try {
        const execConfig = { encoding: 'utf8', cwd };
        const detailString = cp.execSync(`git --no-pager show --format='%H%n%h%n%cn%n%cI%n%an%n%aI%n%s' --quiet --encoding=UTF-8`, execConfig);
        const [sha, abbreviatedSha, committer, committerDate, author, authorDate, commitMessage] = detailString.split('\n');
        const branch = (() => {
            try {
                return cp.execSync('git --no-pager symbolic-ref --short HEAD --quiet', execConfig).trim();
            }
            catch (e) {
                return null; // ref HEAD is not a symbolic ref
            }
        })();
        const tagString = cp.execSync('git --no-pager describe --tags --long --always', execConfig).trim();
        const [, lastTag, commitsSinceLastTag] = /^(.*)-(\d+)-\w+$/.exec(tagString) || [null, null, Infinity];
        return {
            branch,
            sha,
            abbreviatedSha,
            tag: +commitsSinceLastTag === 0 ? lastTag : null,
            lastTag: lastTag,
            commitsSinceLastTag: +commitsSinceLastTag,
            committer,
            committerDate,
            author,
            authorDate,
            commitMessage,
        };
    }
    catch (e) {
        return null;
    }
}
exports.default = getRepoInfo;
//# sourceMappingURL=index.js.map