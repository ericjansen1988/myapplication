
import React, { useState, useEffect } from 'react';
import { withAuth } from '@okta/okta-react';
import {fetchBackend} from '../utils/fetching';
import { Button } from 'react-bootstrap';


const OAuthSetting = ({auth, title, formatUrl, name}) => {
    
    const [url, setUrl] = useState('');
    
    useEffect(() => {
        fetchBackend(formatUrl, 'GET', undefined, auth).then(url => setUrl(url))
    }, [])
    
    return <Button href={url} disabled={url === ''}>{title}</Button> 
        
}

export default withAuth(OAuthSetting)
