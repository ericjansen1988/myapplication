import moment from 'moment';
import fetchBackend from 'helpers/fetchBackend';

export const refresh = async (user, url, accesstoken, saveFunction) => {
  const momentexpires = moment(accesstoken.expires_at);
  console.log(accesstoken);
  if(momentexpires.add(2, 'minutes').isAfter(moment())) return null;
  console.log('Refresh is nodig want expires is verlopen (expires, current)', momentexpires.format('YYYY-MM-DD HH:mm'), moment().format('YYYY-MM-DD HH:mm'))
  const refreshedToken = await fetchBackend(url, {user, method: 'POST', body: accesstoken});
  if(saveFunction !== null){
    console.log('Saving new accesstoken', refreshedToken);
    await saveFunction(refreshedToken);
  } 
  return refreshedToken;
}
