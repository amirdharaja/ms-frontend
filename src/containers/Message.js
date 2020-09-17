import React from 'react';
import { store } from 'react-notifications-component';


const Message = ({ messageTitle, message, alertType }) => {

    return (
        <main className="message">
            {
                store.addNotification({
                    title:messageTitle,
                    message:message,
                    type:alertType,
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 3000,
                        onScreen: true,
                        pauseOnHover: true
                    },
                })
            }
        </main>
    )
}


export default Message;
