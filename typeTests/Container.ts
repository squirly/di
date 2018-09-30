import {Binding, Container} from '@squirly/di';
import {C} from './Dependencies';
import {
  Service1,
  Service2,
  Service3Invalid,
  Service4Invalid,
  Service5,
  Service6Invalid,
  Service7,
  Service8Invalid,
} from './Injectable';

const binding = Binding<{}>('binding');

const container = Container.create()
  .bindService(binding, Service1)
  .bindService(Service2, Service2)
  // TODO: $ExpectError
  .bindService(C, Service3Invalid)
  // TODO: $ExpectError
  .bindService(binding, Service4Invalid)
  .bindService(binding, Service5)
  // TODO: $ExpectError
  .bindService(binding, Service6Invalid)
  .bindService(binding, Service7)
  // TODO: $ExpectError
  .bindService(binding, Service8Invalid);
