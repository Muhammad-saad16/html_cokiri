import * as migration_20261010_125116_initial from './20261010_125116_initial';

export const migrations = [
  {
    up: migration_20261010_125116_initial.up,
    down: migration_20261010_125116_initial.down,
    name: '20261010_125116_initial'
  },
];
