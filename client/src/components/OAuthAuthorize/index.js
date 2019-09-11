
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import fetchBackend from '../../helpers/fetchBackend';
import useSession from '../../hooks/useSession';

const OAuthAuthorize = ({title, formatUrl}) => {
  const [url, setUrl] = useState('');
    const {user} = useSession();
  useEffect(() => {
    fetchBackend(formatUrl, {user}).then(url => setUrl(url))
  }, [])
    
  return <Button color="primary"
    disabled={url === ''}
    href={url}
    variant="contained">{title}
  </Button> 
        
}

export default OAuthAuthorize;
