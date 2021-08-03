import { format, isToday} from 'date-fns'

export const getFormatedTime = (value: any) => {
    if (isToday(value)) return format(value, 'HH:mm')

    const fakeYesterday = new Date(value)
    fakeYesterday.setDate(fakeYesterday.getDate() + 1)

    if (isToday(fakeYesterday)) return 'Yesterday'
    
    if (!isToday(value)) return format(value, 'dd.mm.yyyy')
}
