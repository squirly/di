import {Binding, Container, Injectable} from './';
import {
  CircularDependencyError,
  DependencyResolutionError,
  MissingDependencyError,
} from './DependencyResolutionError';
import {expectRejectedWithError} from './testing';

interface Dep1 {
  readonly a: string;
}
const Dep1 = Binding<Dep1>('Dep1');

interface Dep2 {
  readonly b: number;
}
const Dep2 = Binding<Dep2>('Dep2');

interface Dep3 {
  readonly c: boolean;
}
const Dep3 = Binding<Dep3>('Dep3');

describe('Container', () => {
  describe('#decorate', () => {
    it('adds dependencies in decorator', async () => {
      const container = Container.create()
        .bindFactory(Dep1, async c => ({
          a: (await c.resolve(Dep2)).b.toString(),
        }))
        .decorate(c =>
          c.bindFactory(Dep2, () => ({b: 2})).bindConstant(Dep3, {c: true}),
        );

      expect(await container.resolve(Dep1)).toHaveProperty('a', '2');
      expect(await container.resolve(Dep3)).toHaveProperty('c', true);
    });
  });

  describe('#bindFactory', () => {
    it('calls the factory with the latest container container', async () => {
      const container = Container.create()
        .bindFactory(Dep1, async c => ({
          a: (await c.resolve(Dep2)).b.toString(),
        }))
        .bindConstant(Dep2, {b: 1});

      expect(await container.resolve(Dep1)).toHaveProperty('a', '1');

      expect(
        await container.bindConstant(Dep2, {b: 2}).resolve(Dep1),
      ).toHaveProperty('a', '2');
    });
  });

  describe('#bindSingletonFactory', () => {
    it('calls the factory once', async () => {
      let calls = 0;

      const container = Container.create().bindSingletonFactory(Dep1, () => ({
        a: (++calls).toString(),
      }));

      expect(calls).toBe(0);
      expect(await container.resolve(Dep1)).toHaveProperty('a', '1');
      expect(calls).toBe(1);
      expect(await container.resolve(Dep1)).toHaveProperty('a', '1');
      expect(calls).toBe(1);
    });
  });

  describe('#bindConstant', () => {
    it('returns the constant', async () => {
      const dep: Dep2 = {b: 1};

      const container = Container.create().bindConstant(Dep2, dep);

      expect(await container.resolve(Dep2)).toBe(dep);
    });
  });

  describe('#bindService', () => {
    it('creates the service once', async () => {
      let calls = 0;

      @Injectable
      class DepService {
        static Tag = Binding.Tag<DepService>('DepService');
        static Inject = Injectable.Resolution(Dep1, Dep2);

        constructor(public injectedDep1: Dep1, public injectedDep2: Dep2) {
          calls += 1;
        }
      }

      const dep1: Dep1 = {a: '1'};
      const dep2: Dep2 = {b: 1};

      const container = Container.create()
        .bindService(DepService, DepService)
        .bindConstant(Dep1, dep1)
        .bindConstant(Dep2, dep2);

      expect(calls).toBe(0);
      const dep3 = await container.resolve(DepService);
      expect(calls).toBe(1);

      expect(dep3.injectedDep1).toBe(dep1);
      expect(dep3.injectedDep2).toBe(dep2);

      await container.resolve(DepService);
      expect(calls).toBe(1);
    });
  });

  describe('#resolve', () => {
    it('throws async on a missing dependency', () => {
      const container: Container<any> = Container.create();

      return expectRejectedWithError(
        container.resolve(Dep1),
        MissingDependencyError,
        'Could not find dependency bound to Dep1.',
      );
    });

    it('throws async with chain on a nested missing dependency', () => {
      const container = Container.create().bindFactory(Dep1, async r => {
        await r.resolve(Dep2);
        return {a: '1'};
      });

      return expectRejectedWithError(
        container.resolve(Dep1),
        MissingDependencyError,
        'Could not find dependency bound to Dep2. Resolution chain: Dep1 -> Dep2.',
      );
    });

    it('detects circular dependencies', () => {
      const container = Container.create()
        .bindFactory(Dep1, async r => {
          await r.resolve(Dep2);
          return {a: '1'};
        })
        .bindFactory(Dep2, async r => {
          await r.resolve(Dep3);
          return {b: 1};
        })
        .bindFactory(Dep3, async r => {
          await r.resolve(Dep1);
          return {c: true};
        });

      return expectRejectedWithError(
        container.resolve(Dep1),
        CircularDependencyError,
        'Circular dependency detected, Dep1 already in resolution chain. Resolution chain: Dep1 -> Dep2 -> Dep3 -> Dep1.',
      );
    });

    it('wraps thrown error', () => {
      const container = Container.create()
        .bindService(
          Dep1,
          class Dep1Service implements Dep1 {
            constructor() {
              throw new Error('Test error.');
            }
            a = '2';
          },
        )
        // tslint:disable-next-line:only-arrow-functions
        .bindFactory(Dep2, async function(r) {
          await r.resolve(Dep1);
          return {b: 2};
        })
        .bindFactory(Dep3, async function dep3Factory(r) {
          await r.resolve(Dep2);
          return {c: false};
        });

      return expectRejectedWithError(
        container.resolve(Dep3),
        DependencyResolutionError,
        'Test error. Resolution chain: dep3Factory implements Dep3 -> Dep2 -> Dep1Service implements Dep1.',
      );
    });
  });

  describe('README example', () => {
    it('runs', async () => {
      const AuthenticationKey = Binding<string>('AuthenticationKey');
      const ReversedKey = Binding<string>('ReversedKey');

      @Injectable
      class Client {
        static Tag = Binding.Tag<Client>('Client');
        static Inject = Injectable.Resolution(ReversedKey);

        constructor(private readonly key: string) {}

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

      const client = await container.resolve(Client);

      expect(client.getData()).toBe("Calling API with 'yek-terces-ym'");
    });
  });
});
