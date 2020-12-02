/**
 * @author abdel-maliki
 * Date : 07/09/2020
 */
import {Updatelog} from '../class/updateLog';

export abstract class AbstractEntity<T> {
  public static readonly baseRoute: string;
  id: number | string;
  createdAt: Date;
  updateDate: Date;
  createdBy: number;
  updatelogs: Updatelog[];
}
