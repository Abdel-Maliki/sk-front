/**
 * @author abdel-maliki
 * Date : 27/10/2020
 */

export class Selectitem<T, R = any> {
  constructor(public item: T, label: string, valid: boolean, others: R) {
  }
}
