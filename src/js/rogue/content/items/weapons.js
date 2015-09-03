
// extending Weapon means an item is not equippable but is a weapon.
// etending Hands means an item is equippable in the hands slot
import _ from 'lodash';
import { Hands } from '../../definitions/equipment';
import Attacks from '../attacks/_all';

export class Bow extends Hands {
  static get rarity() { return 25; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#f00' },
      attacks: [Attacks.Ranged({ roll: '1d2' })], // if it can't shoot arrows, it'll bash for 1d2
      slotsTaken: 2,
      range: {
        ammo: ['arrow', 'dart'],
        damageBoost: '1d2'
      }
    });
    super(opts);
  }
}

export class Quarterstaff extends Hands {
  static get rarity() { return 25; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#49311c' },
      attacks: [Attacks.Bash({ roll: '1d6' })],
      slotsTaken: 2
    });
    super(opts);
  }
}

export class Dagger extends Hands {
  static get rarity() { return 25; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d4' })]
    });
    super(opts);
  }
}
