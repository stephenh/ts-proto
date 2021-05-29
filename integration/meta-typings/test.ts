import { protoMetadata } from './simple';
import { writeFileSync } from 'fs';

console.log(protoMetadata);

writeFileSync('./out', JSON.stringify(protoMetadata, undefined, 2));
