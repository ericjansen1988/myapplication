import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


import useSession from 'hooks/useSession';
import fetchBackend from 'helpers/fetchBackend';

const OauthReceiver = ({code, exchangeUrl, saveFunction}) => {
  const {user} = useSession();
  const [loadingToken, setLoadingToken] = useState(false);
  
  useEffect(() => {
    let isMounted = true;
    const getToken = async () => {
      if(code !== undefined){
        setLoadingToken(true);
        const body = {code}
        const accesstoken = await fetchBackend(exchangeUrl, {method: 'POST', body, user}).catch(err => { console.log(err); });
        if(accesstoken === undefined) return setLoadingToken(false);
        console.log(accesstoken);
        if(accesstoken.success){
          await saveFunction(accesstoken);
        }
        if(isMounted) setLoadingToken(false);
      }
    }
    getToken();

    return (() => {isMounted = false})
  }, [])


  if(loadingToken) return <CircularProgress />

  return (
    <Redirect to={window.location.pathname} />
  )
}

OauthReceiver.propTypes = {
  code: PropTypes.string,
  exchangeUrl: PropTypes.string,
  saveFunction: PropTypes.func
}

export default OauthReceiver;