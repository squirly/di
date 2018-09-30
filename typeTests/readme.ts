/**
 * Container
 */
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

// Type assertions

Client.Tag; // $ExpectType Tag<Client>
Client.Inject; // $ExpectType [Binding<Fetcher>]
container; // $ExpectType Container<string | Client | Fetcher>
container.resolve(AuthenticationKey); // $ExpectType Promise<string>
container.resolve(Client); // $ExpectType Promise<Client>

/**
 * Module
 */
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

// Type assertions

module; // $ExpectType Module<Fetcher, string | Fetcher>
moduleContainer; // $ExpectType Container<Client | Fetcher>
resolution; // $ExpectType Promise<Client | Fetcher>
