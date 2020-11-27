/**
 * @author abdel-maliki
 * Date : 15/09/2020
 */

export class DateHelpers {
  public static locales = 'fr-FR';

  public static dateToWeekdayDMStrYaHMS(date?: Date): string {
    return DateHelpers.parseDate(date).toLocaleDateString(DateHelpers.locales, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }

  public static dateToWeekdayDMStrYHMS(date?: Date): string {
    return DateHelpers.replaceA(DateHelpers.dateToWeekdayDMStrYaHMS(date));
  }

  public static dateToWeekdayDMYaHMS(date?: Date): string {
    return DateHelpers.parseDate(date).toLocaleDateString(DateHelpers.locales, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }

  public static dateToWeekdayDMYHMS(date?: Date): string {
    return DateHelpers.replaceA(DateHelpers.dateToWeekdayDMYaHMS(date));
  }

  public static dateToDMStrYaHMS(date?: Date): string {
    return DateHelpers.parseDate(date).toLocaleDateString(DateHelpers.locales, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }

  public static dateToDMStrYHMS(date?: Date): string {
    return DateHelpers.replaceA(DateHelpers.dateToDMStrYaHMS(date));
  }

  public static dateToDMYaHMS(date?: Date): string {
    return DateHelpers.parseDate(date).toLocaleDateString(DateHelpers.locales, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }

  public static dateToDMYHMS(date?: Date): string {
    return DateHelpers.replaceA(DateHelpers.dateToDMYaHMS(date));
  }

  public static dateToDDMMYYYY(date?: Date): string {
    return DateHelpers.parseDate(date).toLocaleDateString(DateHelpers.locales, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  }

  public static dateToDDMM(date?: Date): string {
    return DateHelpers.parseDate(date).toLocaleDateString(DateHelpers.locales, {
      month: 'numeric',
      day: 'numeric',
    });
  }

  public static dateToMMYYYY(date?: Date): string {
    return DateHelpers.parseDate(date).toLocaleDateString(DateHelpers.locales, {
      year: 'numeric',
      month: 'numeric',
    });
  }

  public static dateToYYYY(date?: Date): string {
    return DateHelpers.parseDate(date).toLocaleDateString(DateHelpers.locales, {
      year: 'numeric',
    });
  }

  public static dateToMM(date?: Date): string {
    return DateHelpers.parseDate(date).toLocaleDateString(DateHelpers.locales, {
      month: 'numeric',
    });
  }

  public static dateToMMstr(date?: Date): string {
    return DateHelpers.parseDate(date).toLocaleDateString(DateHelpers.locales, {
      month: 'long',
    });
  }

  public static dateToDD(date?: Date): string {
    return DateHelpers.parseDate(date).toLocaleDateString(DateHelpers.locales, {
      day: 'numeric'
    });
  }

  public static dateToHHMMSS(date?: Date): string {
    return DateHelpers.parseDate(date).toLocaleTimeString(DateHelpers.locales, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }

  public static dateToHHMM(date?: Date): string {
    return DateHelpers.parseDate(date).toLocaleTimeString(DateHelpers.locales, {
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  public static dateToHH(date?: Date): string {
    return DateHelpers.parseDate(date).toLocaleTimeString(DateHelpers.locales, {
      hour: 'numeric',
    });
  }

  public static replaceA(date: string): string {
    return date ? date.replace('à ', '') : '';
  }

  public static parseDate(date: any): Date {
    return date
      ? date instanceof Date
        ? date
        : typeof date === 'string'
          ? new Date(Date.parse(date))
          : typeof date === 'number'
            ? new Date(date)
            : new Date()
      : new Date();
  }

}
