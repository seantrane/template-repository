# template-repository

> A monorepo example for developing and maintaining a cluster of container-based services and applications.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Continuous Integration](https://github.com/seantrane/template-repository/actions/workflows/integration.yml/badge.svg)](https://github.com/seantrane/template-repository/actions/workflows/integration.yml) [![Continuous Delivery](https://github.com/seantrane/template-repository/actions/workflows/delivery.yml/badge.svg)](https://github.com/seantrane/template-repository/actions/workflows/delivery.yml) [![Continuous Deployment](https://github.com/seantrane/template-repository/actions/workflows/deployment.yml/badge.svg)](https://github.com/seantrane/template-repository/actions/workflows/deployment.yml)

## Table of Contents

- [About](#about)
- [Install](#install)
- [Support](#support)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## About <a id="about"></a>

`template-repository` is a monorepo example for developing and maintaining a cluster of container-based services and applications.

## Install <a id="install"></a>

### Step 1: Clone the repository

```sh
git clone git@github.com:seantrane/template-repository.git template-repository && cd template-repository
```

### Step 2: Run docker-compose to build and launch images/containers

```sh
# Build the images:
docker-compose build

# Start the containers:
docker-compose up --build

# Stop the containers:
docker-compose stop

# Stop and remove containers, networks, images, and volumes:
docker-compose down
```

---

## Support <a id="support"></a>

[Submit an issue](https://github.com/seantrane/template-repository/issues/new), in which you should provide as much detail as necessary for your issue.

## Contributing <a id="contributing"></a>

Contributions are always appreciated. Read [CONTRIBUTING.md](https://github.com/seantrane/template-repository/blob/main/CONTRIBUTING.md) documentation to learn more.

## Changelog <a id="changelog"></a>

Release details are documented in the [CHANGELOG.md](https://github.com/seantrane/template-repository/blob/main/CHANGELOG.md) file, and on the [GitHub Releases page](https://github.com/seantrane/template-repository/releases).

---

## License <a id="license"></a>

[ISC License](https://github.com/seantrane/template-repository/blob/main/LICENSE)

Copyright (c) 2020 [Sean Trane Sciarrone](https://github.com/seantrane)
