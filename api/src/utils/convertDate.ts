import { DateTime } from "luxon"

export const convertDate = ( dateToConvert: Date | DateTime ) => {
    if ( dateToConvert instanceof Date ) {
        return DateTime.fromJSDate( dateToConvert )
    }
    return dateToConvert.toJSDate()
}
