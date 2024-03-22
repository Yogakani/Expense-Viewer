import { useState } from "react";
import { Form } from 'react-bootstrap';
import ErrorPopup from "./component/ErrorPopup";
import { get } from './util/HttpUtil';

export default function Registration() {

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstname : '',
        lastname : '',
        username : '',
        emailid : '',
        password : '',
        confirmpassword : ''
    });
    const [invalid, setInvalid] = useState(false);
    const [invalidErrMsgs] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name] : value});
    }

    const moveNextPage = () => {
        setStep(step + 1);
    }

    function renderbutton() {
        switch (step) {
            case 1:
            case 2:
                return (<button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>);
                
            default:
                break;
        }
    }

    function handleNext() {
        switch (step) {
            case 1:
                if (validateFirstStep() === true) {
                    setInvalid(false);
                    flushErrors();
                    userIdAvailabilityCheck();
                }    
                break;
            
            case 2:
                if (validateSecondStep() === true) {
                    setInvalid(false);
                    flushErrors();
                    emailIdAvailabilityCheck();
                }
                break;
        
            default:
                break;
        }
    }

    const validateFirstStep = () => {
        let valid = true;

        if (formData.firstname === '') {
            setInvalid(true);
            invalidErrMsgs.push('Please enter First Name');
        }

        if (formData.lastname === '') {
            setInvalid(true);
            invalidErrMsgs.push('Please enter Last Name');
        }

        if (formData.username === '') {
            setInvalid(true);
            invalidErrMsgs.push('Please enter User Name');
        }

        if (formData.firstname === '' | formData.lastname === '' | formData.username === '') {
            valid = !valid
        }
        
        return valid;
    }

    const validateSecondStep = () => {
        let valid = true;

        if (formData.emailid === '') {
            setInvalid(true);
            invalidErrMsgs.push('Please enter Email Address');
        }

        if (formData.password === '') {
            setInvalid(true);
            invalidErrMsgs.push('Please enter Password');
        }

        if (formData.confirmpassword === '') {
            setInvalid(true);
            invalidErrMsgs.push('Please enter Confirm Password');
        }

        if (formData.password !== formData.confirmpassword) {
            setInvalid(true);
            invalidErrMsgs.push('Entered Password and Confirm Password are not same.')
        }

        if (formData.emailid === '' | formData.password === '' | formData.confirmpassword === '' | formData.password !== formData.confirmpassword) {
            valid = !valid;
        }

        return valid;
    }

    const resetInvalid = (e) => {
        if (invalid && e.key !== '' ) {
            setInvalid(false);
            flushErrors();
        }
    }

    const flushErrors = () => {
        invalidErrMsgs.splice(0, invalidErrMsgs.length);
    }
    
    const userIdAvailabilityCheck = () => {
        const headers = {'user_id' : formData.username};
        get('api/v1/user/userIdAvailabilityCheck', headers).then( (result) => {
            if (result['code'] === 200 & result['isAvailable'] === true) {
                console.log('Msg : ', result['msg']);
                moveNextPage();
            } else {
                console.error('Msg : ', result['msg']);
                setInvalid(true);
                invalidErrMsgs.push(result['msg']);
            }
        });
    }

    const emailIdAvailabilityCheck = () => {
        const headers = {'email_id' : formData.emailid};
        get('api/v1/user/emailIdAvailabilityCheck', headers).then( (result) => {
            if (result['code'] === 200 & result['isAvailable'] === true) {
                console.log('Msg : ', result['msg']);
                console.log('OTP :', result['otp']);
                moveNextPage();
            } else {
                console.error('Msg : ', result['msg']);
                setInvalid(true);
                invalidErrMsgs.push(result['msg']);
            }
        });
    }

    return(
        <>
            <div className="card position-absolute p-3 top-50 start-50 translate-middle" style={{width: 1000, backgroundColor : '#000435'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-5 text-start">
                            <img src={process.env.PUBLIC_URL + '/mobile-reg-cover.jpg'} alt="reg-cover" className="rounded" 
                                width={475}>
                            </img>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-6 text-center">
                           <div className="card p-3 border-0 border-start" style={{width:450}}>
                                <div className="row">
                                    <div className="col mb-3 mt-3 text-center">
                                        <img src={process.env.PUBLIC_URL + '/foursquare.png'} alt="logo" className='rounded'></img>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col mb-3 text-center">
                                        <h3 className="fst-normal">Create your Account</h3>
                                    </div>
                                </div>
                                {invalid ? ( <ErrorPopup errorMsgs={invalidErrMsgs}></ErrorPopup>) : null}
                                <div className="container">
                                    <Form noValidate>
                                        { step === 1 && (
                                            <Form.Group>
                                                <div className="row">
                                                    <div className="col-3"></div>
                                                    <div className="col-6 text-start">
                                                        <Form.Label>First Name</Form.Label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-3"></div>
                                                    <div className="col-6 mb-3 text-center">
                                                        <Form.Control id="firstname" type="text" name="firstname" value={formData.firstname} 
                                                            onChange={handleInputChange} onKeyDown={resetInvalid} required>    
                                                        </Form.Control>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-3"></div>
                                                    <div className="col-6 text-start">
                                                        <Form.Label>Last Name</Form.Label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-3"></div>
                                                    <div className="col-6 mb-3 text-center">
                                                        <Form.Control id="lastname" type="text" name="lastname" value={formData.lastname} 
                                                            onChange={handleInputChange} onKeyDown={resetInvalid} required>    
                                                        </Form.Control>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-3"></div>
                                                    <div className="col-6 text-start">
                                                        <Form.Label>User Name</Form.Label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-3"></div>
                                                    <div className="col-6 mb-3 text-center">
                                                        <Form.Control id="username" type="text" name="username" value={formData.username} 
                                                            onChange={handleInputChange} onKeyDown={resetInvalid} required>    
                                                        </Form.Control>
                                                    </div>
                                                </div>
                                            </Form.Group>
                                        )}
                                        { step === 2 && (
                                            <Form.Group>
                                                <div className="row">
                                                    <div className="col-3"></div>
                                                    <div className="col-6 text-start">
                                                        <Form.Label>Email Address</Form.Label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-3"></div>
                                                    <div className="col-6 mb-3 text-center">
                                                        <Form.Control id="emailid" type="text" name="emailid" value={formData.emailid} 
                                                            onChange={handleInputChange} onKeyDown={resetInvalid} required>    
                                                        </Form.Control>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-3"></div>
                                                    <div className="col-6 text-start">
                                                        <Form.Label>Password</Form.Label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-3"></div>
                                                    <div className="col-6 mb-3 text-center">
                                                        <Form.Control id="password" type="password" name="password" value={formData.password} 
                                                            onChange={handleInputChange} onKeyDown={resetInvalid} required>    
                                                        </Form.Control>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-3"></div>
                                                    <div className="col-6 text-start">
                                                        <Form.Label>Confirm Password</Form.Label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-3"></div>
                                                    <div className="col-6 mb-3 text-center">
                                                        <Form.Control id="confirmpassword" type="password" name="confirmpassword" 
                                                            value={formData.confirmpassword}  onChange={handleInputChange} 
                                                            onKeyDown={resetInvalid} required>    
                                                        </Form.Control>
                                                    </div>
                                                </div>
                                            </Form.Group>
                                        )}
                                        <div className="row mt-4">
                                            <div className="col-6 d-grid gap-2 col mx-auto">
                                                { renderbutton() }
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                                <div className="mb-5"></div>
                                <div className="mb-5"></div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}