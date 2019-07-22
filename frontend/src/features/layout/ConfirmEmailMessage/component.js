import React from 'react';
import './style.css';

const ConfirmEmailMessage = () => {
    return (
        <div className="confirm d-flex justify-content-center align-items-center flex-column p-4 text-center">
            <h5>Confirm email address</h5>
            <div className="message">
                Thank you %username% for registration!
                <br />
                We have sent you a confirmation email. Please check it to
                complete registration.
            </div>
        </div>
    );
};

export default ConfirmEmailMessage;
