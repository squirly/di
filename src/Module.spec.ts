import {Binding, Container, Injectable} from './';
import {MissingDependencyError} from './DependencyResolutionError';
import {Module} from './Module';
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
  describe('README example', () => {
    it('runs', async () => {
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

      const module = Module.create(
        Container.create()
          .bindConstant(AuthenticationKey, 'my-secret-key')
          .bindSingletonFactory(ReversedKey, async c =>
            Array.from(await c.resolve(AuthenticationKey))
              .reverse()
              .join(''),
          ),
      ).export(ReversedKey);

      const container = Container.create()
        .importModule(module)
        .bindService(Client, Client);

      const client = await container.resolve(Client);

      expect(client.getData()).toBe("Calling API with 'yek-terces-ym'");

      await expectRejectedWithError(
        container.resolve(AuthenticationKey),
        MissingDependencyError,
        'Could not find dependency bound to AuthenticationKey.',
      );
    });
  });
});
