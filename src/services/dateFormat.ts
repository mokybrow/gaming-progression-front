// export function formatDate(string: any) {
//     var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//     if (string !== undefined){

//         return new string.toLocaleDateString([], options)
//     }
// }

export function formatDate(time : any) {
    
    const event = new Date(time);

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    }

    return event.toLocaleDateString([], options);

    
}