import {Binding, Injectable} from '@squirly/di';
import {A, B, C} from './Dependencies';

// Test simple DI configuration

@Injectable
export class Service1 {
  static Inject = Injectable.Resolution(A, B);

  constructor(a: A, b: B) {}
}

// Test simple DI configuration with Tag

@Injectable
export class Service2 {
  static Tag = Binding.Tag<Service2>('Service2');
  static Inject = Injectable.Resolution(A, B);

  constructor(a: A, b: B) {}
}

// Test simple DI configuration with invalid Tag fails

// $ExpectError
@Injectable
export class Service3Invalid {
  static Tag = Binding.Tag<C>('Service3Invalid');
  static Inject = Injectable.Resolution(A, B);

  constructor(a: A, b: B) {}
}

// Test invalid DI configuration does not pass

// $ExpectError
@Injectable
export class Service4Invalid {
  static Inject = Injectable.Resolution(A, B);

  constructor(b: B, a: A) {}
}

// Test extra Injects passes

@Injectable
export class Service5 {
  static Inject = Injectable.Resolution(A, B, C);

  constructor(b: A, a: B) {}
}

// Test missing Injects does not pass

// $ExpectError
@Injectable
export class Service6Invalid {
  static Inject = Injectable.Resolution(A, B);

  constructor(a: A, b: B, c: C) {}
}

// Test no Inject is okay

@Injectable
export class Service7 {
  constructor() {}
}

// Test no Inject fails with dependencies

// $ExpectError
@Injectable
export class Service8Invalid {
  constructor(a: A) {}
}
