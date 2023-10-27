


export function getTimeStamp(params) {
    let current_date = new Date();

    let year = current_date.getFullYear();
    let month = current_date.getMonth() + 1; // getMonth() 返回的月份从0开始
    let day = current_date.getDate();
    let hours = current_date.getHours();
    let minutes = current_date.getMinutes();
    let seconds = current_date.getSeconds();

    let timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return timestamp
}