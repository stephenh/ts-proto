import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as protobuf from 'protobufjs/minimal';
import * as Long from 'long';

// Workaround for "smart" protobuf.js
// It tries to detect if long.js is available and only requires it then.
// In our case, long.js is available and we want it to be used.
// We have to force protobuf.js to use it with the following hack:
protobuf.util.Long = Long;
protobuf.configure();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
