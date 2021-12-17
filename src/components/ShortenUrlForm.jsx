/* eslint no-unused-vars: 1 */

import React, { useCallback, useState } from 'react';
import { InfoMessage } from './InfoMessage/InfoMessage';
import fetchShortUrl from '../data/fetchShortUrl';

const ShortenUrlForm = () => {
    const [value, setValue] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const onChange = useCallback(
        (e) => {
            setValue(e.target.value);
        },
        [
            setValue
        ],
    );

    // Use our own statusMessage to highlight that the provided URL is not matching the expected pattern.
    const onInvalid = useCallback(
        (e) => {
            e.preventDefault();
            setStatusMessage(`Please provide a valid url`);
        },
        [
            setStatusMessage
        ]
    );
    
    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const isValidURL = e.currentTarget.checkValidity();
            if(!isValidURL) {
                setStatusMessage(`Please provide a valid url`); 
            } else {
                const shorttedURL = await fetchShortUrl(value);
                setShortUrl(shorttedURL?.link);
                setStatusMessage(`Url has been shorten ${shorttedURL?.link} and copied`);
                navigator.clipboard.writeText(`${shorttedURL?.link}`);
            }
        },
        [
            value, shortUrl, fetchShortUrl, setStatusMessage, setShortUrl
        ],
    );

    return (
        <>
        <form id="shortener" onSubmit={onSubmit}>
            <label htmlFor="shorten">
                Url:
                <input
                    placeholder="Please provide a url to shorten"
                    id="shorten"
                    type="url"
                    onInvalid={onInvalid}
                    value={value}
                    onChange={onChange}
                    required
                />
            </label>
            <button type="submit"> Shorten and copy URL</button>
        </form>
        <InfoMessage message={statusMessage} />
        </>
    );
};

export default ShortenUrlForm;
