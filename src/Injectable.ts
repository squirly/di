import {Binding} from './Binding';

export interface Injectable<Service, Dependency> {
  new (...args: Dependency[]): Service;
  Inject?: Dependency[];
}

export function Injectable<Service, Target extends new () => Service>(
  Class: Target & Injectable0<Service>,
): typeof Class;
export function Injectable<Service, D1, Target extends new (d1: D1) => Service>(
  Class: Target & Injectable1<Service, D1>,
): typeof Class;
export function Injectable<
  Service,
  D1,
  D2,
  Target extends new (d1: D1, d2: D2) => Service
>(Class: Target & Injectable2<Service, D1, D2>): typeof Class;
export function Injectable<
  Service,
  D1,
  D2,
  D3,
  Target extends new (d1: D1, d2: D2, d3: D3) => Service
>(Class: Target & Injectable3<Service, D1, D2, D3>): typeof Class;
export function Injectable<
  Service,
  D1,
  D2,
  D3,
  D4,
  Target extends new (d1: D1, d2: D2, d3: D3, d4: D4) => Service
>(Class: Target & Injectable4<Service, D1, D2, D3, D4>): typeof Class;
export function Injectable<
  Service,
  D1,
  D2,
  D3,
  D4,
  D5,
  Target extends new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5) => Service
>(Class: Target & Injectable5<Service, D1, D2, D3, D4, D5>): typeof Class;
export function Injectable<
  Service,
  D1,
  D2,
  D3,
  D4,
  D5,
  D6,
  Target extends new (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5, d6: D6) => Service
>(Class: Target & Injectable6<Service, D1, D2, D3, D4, D5, D6>): typeof Class;
export function Injectable<
  Service,
  D1,
  D2,
  D3,
  D4,
  D5,
  D6,
  D7,
  Target extends new (
    d1: D1,
    d2: D2,
    d3: D3,
    d4: D4,
    d5: D5,
    d6: D6,
    d7: D7,
  ) => Service
>(
  Class: Target & Injectable7<Service, D1, D2, D3, D4, D5, D6, D7>,
): typeof Class;
export function Injectable<
  Service,
  D1,
  D2,
  D3,
  D4,
  D5,
  D6,
  D7,
  D8,
  Target extends new (
    d1: D1,
    d2: D2,
    d3: D3,
    d4: D4,
    d5: D5,
    d6: D6,
    d7: D7,
    d8: D8,
  ) => Service
>(
  Class: Target & Injectable8<Service, D1, D2, D3, D4, D5, D6, D7, D8>,
): typeof Class;
export function Injectable<
  Service,
  D1,
  D2,
  D3,
  D4,
  D5,
  D6,
  D7,
  D8,
  D9,
  Target extends new (
    d1: D1,
    d2: D2,
    d3: D3,
    d4: D4,
    d5: D5,
    d6: D6,
    d7: D7,
    d8: D8,
    d9: D9,
  ) => Service
>(
  Class: Target & Injectable9<Service, D1, D2, D3, D4, D5, D6, D7, D8, D9>,
): typeof Class;
export function Injectable<
  Service,
  D1,
  D2,
  D3,
  D4,
  D5,
  D6,
  D7,
  D8,
  D9,
  D10,
  Target extends new (
    d1: D1,
    d2: D2,
    d3: D3,
    d4: D4,
    d5: D5,
    d6: D6,
    d7: D7,
    d8: D8,
    d9: D9,
    d10: D10,
  ) => Service
>(
  Class: Target &
    Injectable10<Service, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10>,
): typeof Class;

export function Injectable<
  Service,
  D1,
  D2,
  D3,
  D4,
  D5,
  D6,
  D7,
  D8,
  D9,
  D10,
  D11,
  Target extends new (
    d1: D1,
    d2: D2,
    d3: D3,
    d4: D4,
    d5: D5,
    d6: D6,
    d7: D7,
    d8: D8,
    d9: D9,
    d10: D10,
    d11: D11,
  ) => Service
>(
  Class: Target &
    Injectable11<Service, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11>,
): typeof Class;

export function Injectable<
  Service,
  D1,
  D2,
  D3,
  D4,
  D5,
  D6,
  D7,
  D8,
  D9,
  D10,
  D11,
  D12,
  Target extends new (
    d1: D1,
    d2: D2,
    d3: D3,
    d4: D4,
    d5: D5,
    d6: D6,
    d7: D7,
    d8: D8,
    d9: D9,
    d10: D10,
    d11: D11,
    d12: D12
  ) => Service
>(
  Class: Target &
    Injectable12<Service, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12>,
): typeof Class;

export function Injectable<
  Service,
  D1,
  D2,
  D3,
  D4,
  D5,
  D6,
  D7,
  D8,
  D9,
  D10,
  D11,
  D12,
  D13,
  Target extends new (
    d1: D1,
    d2: D2,
    d3: D3,
    d4: D4,
    d5: D5,
    d6: D6,
    d7: D7,
    d8: D8,
    d9: D9,
    d10: D10,
    d11: D11,
    d12: D12,
    d13: D13,
  ) => Service
>(
  Class: Target &
    Injectable13<Service, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13>,
): typeof Class;

export function Injectable<Dependency, T extends Injectable<T, Dependency>>(
  target: T,
): T {
  return target;
}

export namespace Injectable {
  export const Resolution = <Injection extends Array<Binding<any>>>(
    ...inject: Injection
  ): Injection => {
    return inject;
  };
}

type Injectable0<Service> = Partial<Binding<Service>> &
  Partial<Inject<never[]>>;
type Injectable1<Service, D1> = Partial<Binding<Service>> &
  Inject<[Binding<D1>]>;
type Injectable2<Service, D1, D2> = Partial<Binding<Service>> &
  Inject<[Binding<D1>, Binding<D2>]>;
type Injectable3<Service, D1, D2, D3> = Partial<Binding<Service>> &
  Inject<[Binding<D1>, Binding<D2>, Binding<D3>]>;
type Injectable4<Service, D1, D2, D3, D4> = Partial<Binding<Service>> &
  Inject<[Binding<D1>, Binding<D2>, Binding<D3>, Binding<D4>]>;
type Injectable5<Service, D1, D2, D3, D4, D5> = Partial<Binding<Service>> &
  Inject<[Binding<D1>, Binding<D2>, Binding<D3>, Binding<D4>, Binding<D5>]>;
type Injectable6<Service, D1, D2, D3, D4, D5, D6> = Partial<Binding<Service>> &
  Inject<
    [
      Binding<D1>,
      Binding<D2>,
      Binding<D3>,
      Binding<D4>,
      Binding<D5>,
      Binding<D6>
    ]
  >;
type Injectable7<Service, D1, D2, D3, D4, D5, D6, D7> = Partial<
  Binding<Service>
> &
  Inject<
    [
      Binding<D1>,
      Binding<D2>,
      Binding<D3>,
      Binding<D4>,
      Binding<D5>,
      Binding<D6>,
      Binding<D7>
    ]
  >;
type Injectable8<Service, D1, D2, D3, D4, D5, D6, D7, D8> = Partial<
  Binding<Service>
> &
  Inject<
    [
      Binding<D1>,
      Binding<D2>,
      Binding<D3>,
      Binding<D4>,
      Binding<D5>,
      Binding<D6>,
      Binding<D7>,
      Binding<D8>
    ]
  >;
type Injectable9<Service, D1, D2, D3, D4, D5, D6, D7, D8, D9> = Partial<
  Binding<Service>
> &
  Inject<
    [
      Binding<D1>,
      Binding<D2>,
      Binding<D3>,
      Binding<D4>,
      Binding<D5>,
      Binding<D6>,
      Binding<D7>,
      Binding<D8>,
      Binding<D9>
    ]
  >;
type Injectable10<Service, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10> = Partial<
  Binding<Service>
> &
  Inject<
    [
      Binding<D1>,
      Binding<D2>,
      Binding<D3>,
      Binding<D4>,
      Binding<D5>,
      Binding<D6>,
      Binding<D7>,
      Binding<D8>,
      Binding<D9>,
      Binding<D10>
    ]
  >;
  type Injectable11<Service, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11> = Partial<
  Binding<Service>
> &
  Inject<
    [
      Binding<D1>,
      Binding<D2>,
      Binding<D3>,
      Binding<D4>,
      Binding<D5>,
      Binding<D6>,
      Binding<D7>,
      Binding<D8>,
      Binding<D9>,
      Binding<D10>,
      Binding<D11>
    ]
  >;
  type Injectable12<Service, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12> = Partial<
  Binding<Service>
> &
  Inject<
    [
      Binding<D1>,
      Binding<D2>,
      Binding<D3>,
      Binding<D4>,
      Binding<D5>,
      Binding<D6>,
      Binding<D7>,
      Binding<D8>,
      Binding<D9>,
      Binding<D10>,
      Binding<D11>,
      Binding<D12>
    ]
  >;
  type Injectable13<Service, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13> = Partial<
  Binding<Service>
> &
  Inject<
    [
      Binding<D1>,
      Binding<D2>,
      Binding<D3>,
      Binding<D4>,
      Binding<D5>,
      Binding<D6>,
      Binding<D7>,
      Binding<D8>,
      Binding<D9>,
      Binding<D10>,
      Binding<D11>,
      Binding<D12>,
      Binding<D13>
    ]
  >;

interface Inject<T extends Array<Binding<any>>> {
  Inject: T;
}
