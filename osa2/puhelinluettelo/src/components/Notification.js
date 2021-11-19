import React from 'react';

const Notification = ({message, success}) => {
    if (success === null) {
        return null;
    }
    
    const colorTheme = success === true ? 'green' : 'red';
    const notificationStyle = {
        color: colorTheme,
        background: 'lightgray',
        border: `solid 2px ${colorTheme}`,
        padding: 5,
        margin: '20px 0',
        width: 'fit-content',
        borderRadius: 5
    }

    return message === null ? null : 
        (
        <div style={notificationStyle}>
            {message}
        </div>
    );
};

export default Notification;