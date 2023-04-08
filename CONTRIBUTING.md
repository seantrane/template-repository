# Contributing

> Thank you for contributing. Contributions are always welcome, no matter how large or small.

## Table of Contents

- [Guidelines](#guidelines)
- [Pull Requests](#submitting-a-pull-request)
- [Coding Rules](#coding-rules)
- [Working with Code](#working-with-code)
- [File Structure](#file-structure)

---

## Guidelines <a id="guidelines"></a>

As a contributor, here are the guidelines you should follow:

- [Code of conduct](#code-of-conduct)
- [How can I contribute?](#how-can-i-contribute)
- [Using the issue tracker](#using-the-issue-tracker)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Coding rules](#coding-rules)
- [Working with code](#working-with-code)

We also recommend to read [How to Contribute to Open Source](https://opensource.guide/how-to-contribute).

---

## Code of conduct <a id="code-of-conduct"></a>

Please read and follow our [code of conduct](CODE_OF_CONDUCT.md).

---

---

## How can I contribute? <a id="how-can-i-contribute"></a>

### Improve documentation <a id="improve-documentation"></a>

Consider helping us to improve our documentation by finding _documentation issues_ that need help, and by submitting pull requests for corrections, clarifications, more examples, new features, etc.

Please follow the [Documentation guidelines](STYLE_GUIDES.md#documentation).

### Give feedback on issues <a id=""></a>

Some issues are created without information requested in the [Bug report guideline](#bug-report). Help making them easier to resolve by adding any relevant information.

Issues with the [design label](https://github.com/issues?q=is%3Aopen+is%3Aissue+user%3Aseantrane+archived%3Afalse+label%3Adesign) are meant to discuss the implementation of new features. Participating in the discussion is a good opportunity to get involved and influence the future.

### Fix bugs and implement features <a id=""></a>

Confirmed bug and ready to implement features are marked with the [help wanted label](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+user%3Aseantrane+archived%3Afalse+label%3A%22help+wanted%22). Post a comment on an issue to indicate you would like to work on it and to request help from the [@seantrane/technology](https://github.com/orgs/seantrane/teams/technology) team and the community.

---

## Using the issue tracker <a id="using-the-issue-tracker"></a>

The issue tracker is the channel for [bug reports](#bug-report), [features requests](#feature-request) and [submitting pull requests](#submitting-a-pull-request) only. Please use the [Support](docs/support/README.md) and [Get help](README.md#get-help) sections for support, troubleshooting and questions.

Before opening an Issue or a Pull Request, please use the [GitHub issue search](https://github.com/issues?utf8=%E2%9C%93&q=user%3Aseantrane) to make the bug or feature request hasn't been already reported or fixed.

### Bug report <a id="bug-report"></a>

A good bug report shouldn't leave others needing to chase you up for more information. Please try to be as detailed as possible in your report and fill the information requested in the _[Bug/Issue Template](ISSUE_TEMPLATE.md)_.

### Feature request <a id="feature-request"></a>

Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Please provide as much detail and context as possible and fill the information requested in the _[Agile Story Template](STORY_TEMPLATE.md)_.

---

## Submitting a Pull Request <a id="submitting-a-pull-request"></a>

Good pull requests whether patches, improvements or new features are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

**Please ask first** before embarking on any significant pull request (e.g. implementing features, refactoring code), otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the project.

If you never created a pull request before, then [learn how to submit a pull request (great tutorial)](https://opensource.guide/how-to-contribute/#opening-a-pull-request).

Here is a summary of the steps to follow:

1. [Set up the workspace](#set-up-the-workspace)
2. If you cloned a while ago, get the latest changes from upstream and update dependencies.
3. Create a new topic branch (off the main project development branch) to contain your feature, change, or fix; `git checkout -b <topic-branch-name>`
4. Make your code changes, following the [Coding rules](#coding-rules)
5. Push your topic branch up to your fork; `git push origin <topic-branch-name>`
6. [Open a Pull Request](https://help.github.com/articles/creating-a-pull-request/#creating-the-pull-request) with a clear title and description.

**Tips**:

- Create your branch from `master`.
- Ensure your [git commit messages follow the required format](https://github.com/seantrane/engineering/blob/master/STYLE_GUIDES.md#git-commit-messages).
- Ensure your scripts are well-formed, well-documented and object-oriented.
- Ensure your scripts are stateless and can be reused by all.
- Update your branch, and resolve any conflicts, before making pull request.
- Fill in [the required template](https://github.com/seantrane/engineering/blob/master/PULL_REQUEST_TEMPLATE.md).
- Do not include issue numbers in the PR title.
- Include screenshots and animated GIFs in your pull request whenever possible.
- Follow the [style guide](https://github.com/seantrane/engineering/blob/master/STYLE_GUIDES.md) [applicable to the language](https://github.com/seantrane/engineering/blob/master/STYLE_GUIDES.md#languages) or task.
- Include thoughtfully-worded, well-structured tests/specs. See the [Tests/Specs Style Guide](https://github.com/seantrane/engineering/blob/master/STYLE_GUIDES.md#tests).
- Document new code based on the [Documentation Style Guide](https://github.com/seantrane/engineering/blob/master/STYLE_GUIDES.md#documentation).
- End all files with a newline.

---

## Coding rules <a id="coding-rules"></a>

- [Commit message guidelines](STYLE_GUIDES.md#git-commit-messages)
- [Documentation](STYLE_GUIDES.md#documentation)
- [Lint](STYLE_GUIDES.md#lint)
- [Source Code](STYLE_GUIDES.md#source-code)
- [Tests/Specs](STYLE_GUIDES.md#tests)

---

## Working with code <a id="working-with-code"></a>

### Set up the workspace <a id="set-up-the-workspace"></a>

#### Clone the repo into the current directory <a id="clone-repo"></a>

```sh
git clone git@github.com:seantrane/template-repository.git template-repository && cd template-repository
```

#### Install the repo dependencies <a id="install-repo"></a>

```sh
./run install
```

---

## File Structure <a id="file-structure"></a>

```text
template-repository/
├─ apps/                                       * apps directory
│  ├─ <app>/                                   * <App> directory
│  :  ├─ lib/                                  * <App> dist/lib directory
│     │  ├─ cache.js                           * <App> cache provider
│     │  └─ server.js                          * <App> server
│     │
│     ├─ .dockerignore                         * keep Docker context lean
│     ├─ docker-entrypoint.sh                  * Docker entrypoint scripting
│     ├─ docker-healthcheck                    * Docker healthcheck scripting
│     ├─ index.js                              * node module main-entrypoint
│     ├─ Dockerfile                            * Docker (multi-stage) config
│     ├─ package-lock.json                     * <App> package dependency lock file
│     ├─ package.json                          * <App> package config
│     └─ README.md                             * <App> readme
│
├─ services/                                   * services directory
│  ├─ <service>/                               * <Service> directory
│  :  ├─ .dockerignore                         * keep Docker context lean
│  :  ├─ docker-healthcheck                    * Docker healthcheck scripting
│     ├─ Dockerfile                            * Docker (multi-stage) config
│     └─ README.md                             * <Service> readme
│
├─ .editorconfig                               * keep developers/IDE's in sync
├─ .env.example                                * environment configuration variables template
├─ .gitignore                                  * ignore files for git
├─ .markdownlint.yaml                          * Markdown lint rules and config
├─ CHANGLOG.md                                 * changelog autogenerated by `@semantic-release/changelog`
├─ CODE_OF_CONDUCT.md                          * Code of conduct policy
├─ CODEOWNERS                                  * default pull-request reviewers
├─ CONTRIBUTING.md                             * contributing guidelines
├─ docker-compose.yml                          * Docker-compose config
├─ README.md                                   * repository readme
├─ sonar-project.properties                    * SonarQube/SonarCloud configuration
└─ STYLE_GUIDES.md                             * Style guides, standards and practices
```

---

#### Happy coding!
