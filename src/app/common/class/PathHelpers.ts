/**
 * @author abdel-maliki
 * Date : 02/12/2020
 */
import {RouteConstantes} from '../../../environments/route-constantes';

export class PathHelpers {

  public static readonly ID_REPLACE_VALUE = ':id';

  public static join(paths: string[], firstSlash: boolean = true, lastSlash: boolean = false): string {
    return !paths || paths.length === 0
      ? ''
      : paths.map((value, index) => index === paths.length - 1 ? `${value}${lastSlash ? '/' : ''}` : `${index === 0 && firstSlash ? '/' : ''}${value}/`)
        .reduce((p, c) => p + c, '');
  }

  public static joinList(path: string, firstSlash: boolean = true, lastSlash: boolean = false): string {
    if (path.charAt(0) === '/') {
      path = path.substring(1, path.length);
    }
    return PathHelpers.join([path, RouteConstantes.LIST], firstSlash, lastSlash);
  }

  public static joinForm(path: string, firstSlash: boolean = true, lastSlash: boolean = false): string {
    if (path.charAt(0) === '/') {
      path = path.substring(1, path.length);
    }
    return PathHelpers.join([path, RouteConstantes.FORM], firstSlash, lastSlash);
  }

  public static joinFormNew(path: string, firstSlash: boolean = true, lastSlash: boolean = false): string {
    if (path.charAt(0) === '/') {
      path = path.substring(1, path.length);
    }
    return PathHelpers.join([path, RouteConstantes.FORM_NEW], firstSlash, lastSlash);
  }

  public static joinFormUpdate(path: string, firstSlash: boolean = true, lastSlash: boolean = false): string {
    if (path.charAt(0) === '/') {
      path = path.substring(1, path.length);
    }
    return PathHelpers.join([path, RouteConstantes.FORM, PathHelpers.ID_REPLACE_VALUE], firstSlash, lastSlash);
  }

  public static mapUrl(url: string): string {
    return url.replace(/[a-f\d]{24}/gi, PathHelpers.ID_REPLACE_VALUE);
  }

}
