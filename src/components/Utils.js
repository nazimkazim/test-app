function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


function showPeriod(data, dateStart, dataFinish) {
    const start = data.findIndex(item => item.t === dateStart)
    const end = data.findIndex(item => item.t === dataFinish)
    console.log(start, end)
    let obj = data.slice(start,end)
    return obj
  }

  export {formatDate,showPeriod}