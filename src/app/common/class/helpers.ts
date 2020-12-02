/**
 * @author abdel-maliki
 * Date : 03/11/2020
 */

export class Helpers {
  public static hasRole(roles: string[], role: string): boolean {
    return roles && role && roles.includes(role);
  }

  public static hasEveryRoles(allRoles: string[], roles: string[]): boolean {
    return roles && roles.every(role => Helpers.hasRole(allRoles, role));
  }

  public static haseSomeRoles(allRoles: string[], roles: string[]): boolean {
    return roles && roles.some(role => Helpers.hasRole(allRoles, role));
  }

  public static fail(value: never): void {
    throw new Error('Ce cas n\'a pas encore été géré ,' + value);
  }
}
