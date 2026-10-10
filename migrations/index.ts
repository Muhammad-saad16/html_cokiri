import * as migration_20261010_125116_initial from './20261010_125116_initial';
import * as migration_20261010_131628_blob_storage from './20261010_131628_blob_storage';

export const migrations = [
  {
    up: migration_20261010_125116_initial.up,
    down: migration_20261010_125116_initial.down,
    name: '20261010_125116_initial',
  },
  {
    up: migration_20261010_131628_blob_storage.up,
    down: migration_20261010_131628_blob_storage.down,
    name: '20261010_131628_blob_storage'
  },
];
