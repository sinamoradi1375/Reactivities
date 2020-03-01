import moment from "jalali-moment";

export default class Common {
    public static ConvertGregorianToJalaliDate(date: string) {
        return moment(date, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD"); // 1367/11/04
    }

    public static ConvertJalaliToGregorianDate(date: string) {
        return moment.from(date, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD'); // 1989/01/24
    }
}