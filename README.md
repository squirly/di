# @squirly/di

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
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

```typescript
import {Binding, Container, Injectable} from '@squirly/di';

const AuthenticationKey = Binding<string>('AuthenticationKey');
const ReversedKey = Binding<string>('ReversedKey');

@Injectable
class Client {
  static Tag = Binding.Tag<Client>('Client');
  static Inject = Injectable.Resolution([ReversedKey]);

  constructor(private key: string) {}

  getData(): string {
    return `Calling API with '${this.key}'`;
  }
}

const container = Container.create()
  .bindConstant(AuthenticationKey, 'my-secret-key')
  .bindSingletonFactory(ReversedKey, async c =>
    Array.from(await c.resolve(AuthenticationKey))
      .reverse()
      .join(''),
  )
  .bindService(Client, Client);

container.resolve(Client).then(client => {
  client.getData(); // LOG: Calling API with 'yek-terces-ym'
});
```

## Maintainers

Tyler Jones ~ [@squirly](https://github.com/squirly)

## Contribute

PRs accepted.

Small note: If editing the README, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2018 Tyler David Jones
