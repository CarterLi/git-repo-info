# git-repo-info

Retrieves repo information WITH relying on the git command.

## Why another library

There is already a [library](https://github.com/rwjblue/git-repo-info) that works without `git` command, but it's tied to git's internal implementation; the code is fussy and hard to understand. I'm reimplementing its functions using basic `git` command, which results in MUCH less and cleaner code.

> Isn't a library relies on another program's output can be easy broken?

No. There are LOTS of third party git tools that relies on the native `git` command. They have been working without problems for years.

## Implementation details / git commands used

```shell
$ git show --format='%H%n%h%n%cn%n%cI%n%an%n%aI%n%s' -q --encoding=UTF-8
```

For getting basic info of the last commit. Formating switches used are documented by the [offical git docs](https://git-scm.com/docs/git-show#_pretty_formats)


```shell
$ git symbolic-ref --short HEAD
```

For getting working branch

```shell
$ git describe --tags --long --always
```

For getting tag info

## Usage

```js
var getRepoInfo = require('git-repo-info');

var info = getRepoInfo();

info.branch               // current branch
info.sha                  // current sha
info.abbreviatedSha       // first 10 chars of the current sha
info.tag                  // tag for the current sha (or `null` if no tag exists)
info.lastTag              // tag for the closest tagged ancestor
                          //   (or `null` if no ancestor is tagged)
info.commitsSinceLastTag  // number of commits since the closest tagged ancestor
                          //   (`0` if this commit is tagged, or `Infinity` if no ancestor is tagged)
info.committer            // committer for the current sha
info.committerDate        // commit date for the current sha
info.author               // author for the current sha
info.authorDate           // authored date for the current sha
info.commitMessage        // commit message for the current sha
```

## License

MIT
