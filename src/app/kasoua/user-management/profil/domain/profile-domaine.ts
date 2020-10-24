import {AbstractEntity} from '../../../../common/abstract/abstract-entity';

/**
 * @author abdel-maliki
 * Date : 09/09/2020
 */

export class ProfileDomaine extends AbstractEntity<ProfileDomaine> {

  constructor(public name?: string, public description?: string) {
    super();
  }

  generateId(): string {
    const s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array(20).join().split(',').map(() => s.charAt(Math.floor(Math.random() * s.length))).join('');
  }
}
