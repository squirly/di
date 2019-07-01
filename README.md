# @squirly/di

[![CircleCI](https://circleci.com/gh/squirly/di.svg?style=svg)](https://circleci.com/gh/squirly/di)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

> A slim, fully typed, asynchronous dependency injection library for achieving
> IoC.

TODO: Fill out this long description.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Install

```
npm install @squirly/di
```

## Usage

### Container

```typescript
import {Binding, Container, Injectable} from '@squirly/di';

const AuthenticationKey = Binding<string>('AuthenticationKey');
interface Fetcher {
  fetch: () => Promise<{data: string}>;
}
const Fetcher = Binding<Fetcher>('Fetcher');

@Injectable
class Client {
  static Tag = Binding.Tag<Client>('Client');
  static Inject = Injectable.Resolution(Fetcher);

  constructor(private readonly fetcher: Fetcher) {}

  getData(): Promise<string> {
    return this.fetcher
      .fetch()
      .then(result => `Received result: '${result.data}'`);
  }
}

async function fetcherFactory(c: Container<string>): Promise<Fetcher> {
  const key = await c.resolve(AuthenticationKey);

  return {
    fetch: () =>
      Promise.resolve({
        data: `Called with AuthenticationKey "${key}"`,
      }),
  };
}

const container = Container.create()
  .bindConstant(AuthenticationKey, 'my-secret-key')
  .bindSingletonFactory(Fetcher, fetcherFactory)
  .bindService(Client, Client);

const clientResult = container.resolve(Client).then(client => client.getData());

// Logs 'Received result: Called with AuthenticationKey "my-secret-key"';
clientResult.then(console.log);
```

### Module

Using the definitions above, a `Module` can be created.

```typescript
import {Module} from '@squirly/di';

const module = Module.create(
  Container.create()
    .bindConstant(AuthenticationKey, 'my-secret-key')
    .bindSingletonFactory(Fetcher, fetcherFactory),
).export(Fetcher);

const moduleContainer = Container.create()
  .importModule(module)
  .bindService(Client, Client);

moduleContainer.resolve(Client).then(client => {
  client.getData(); // returns "Calling API with 'yek-terces-ym'"
});

// $ExpectError
const resolution = moduleContainer.resolve(AuthenticationKey);
// Type 'string' is not assignable to 'Fetcher | Client'

// Logs "MissingDependencyError('Could not find dependency bound to AuthenticationKey.')"
clientResult.catch(console.log);
```

## Maintainers

Tyler Jones ~ [@squirly](https://github.com/squirly)

## Contribute

PRs accepted. Commits must follow the
[Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).

If editing the README, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2018 Tyler David Jones
