/**
 * @author abdel-maliki
 * Date : 03/11/2020
 */

export class Helpers {
  public static hasRole(roles: string[], role: string): boolean {
    return roles && role && roles.includes(role);
  }
}
