export const detailFormatToJa = (date_str) => {
  const d = new Date(date_str)
  let year = d.getFullYear(),
      month = d.getMonth() + 1,
      date = d.getDate(),
      hour = d.getHours(),
      minutes = d.getMinutes();

  month = (month < 10) ? '0' + month : month;
  date = (date < 10) ? '0' + date : date;
  hour = (hour < 10) ? '0' + hour : hour;
  minutes = (minutes < 10) ? '0' + minutes : minutes;

  let dDelta = (Date.now() - d.getTime()) / 1000;
  let dDeltaStr = '';

  if (dDelta < 0) {
    dDelta -= dDelta * 2;

    if (dDelta < 60) {
      dDeltaStr = [Math.round(dDelta) || '0'] + '秒後';
    } else {
      dDelta = dDelta / 60;

      if (dDelta < 60) {
        dDeltaStr = [Math.round(dDelta * 10) / 10 || '0'] + '分後';
      } else {
        dDelta = dDelta / 60;

        if (dDelta < 24) {
          dDeltaStr = [Math.round(dDelta * 10) / 10 || '0'] + '時間後';
        } else {
          dDelta = dDelta / 24;

          dDeltaStr = [Math.round(dDelta * 10) / 10 || '0'] + '日後';
        }
      }
    }
  } else {
    if (dDelta < 60) {
      dDeltaStr = [Math.round(dDelta) || '0'] + '秒前';
    } else {
      dDelta = dDelta / 60;

      if (dDelta < 60) {
        dDeltaStr = [Math.round(dDelta * 10) / 10 || '0'] + '分前';
      } else {
        dDelta = dDelta / 60;

        if (dDelta < 24) {
          dDeltaStr = [Math.round(dDelta * 10) / 10 || '0'] + '時間前';
        } else {
          dDelta = dDelta / 24;

          dDeltaStr = [Math.round(dDelta * 10) / 10 || '0'] + '日前';
        }
      }
    }
  }

  const format = year + '/' + month + '/' + date + ' ' + hour + ':' + minutes;
  return format + ' ('+ dDeltaStr + ')';
}
