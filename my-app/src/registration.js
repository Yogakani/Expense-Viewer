import { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import ErrorPopup from "./component/ErrorPopup";
import { get, post } from './util/HttpUtil';
import { useNavigate } from 'react-router-dom';
import Icons from "./component/Icons";

export default function Registration() {

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstname : '',
        lastname : '',
        username : '',
        emailid : '',
        password : '',
        confirmpassword : '',
        otp : '',
        mobile : '',
        city : '',
        zipcode : ''
    });
    const [invalid, setInvalid] = useState(false);
    const [invalidErrMsgs] = useState([]);
    const [resOTP, setResOTP] = useState('');
    const navigate = useNavigate();

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
            case 3:
            case 4:
                return (<button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>);

            case 5:
                return (<Button variant="primary" type="submit">Submit</Button>);

            case 6:
                return (<button type="button" className="btn btn-success" onClick={handleProceed}>Proceed</button>)
                
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
            
            case 3:
                if (validateThirdStep() === true) {
                    setInvalid(false);
                    flushErrors();
                    validateEmailOtp();
                }
                break;
            
            case 4:
                if (validateFourthStep() === true) {
                    setInvalid(false);
                    flushErrors();
                    mobileNumAvailabilityCheck();
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

    const validateThirdStep = () => {
        let valid = true;

        if (formData.otp === '') {
            setInvalid(true);
            invalidErrMsgs.push('Please enter OTP');
            valid = !valid;
        }

        return valid;
    }

    const validateFourthStep = () => {
        let valid = true;

        if (formData.mobile === '') {
            setInvalid(true);
            invalidErrMsgs.push('Please enter Mobile Number');
            valid = !valid;
        }

        return valid;
    }

    const validateFifthStep = () => {
        let valid = true;

        if (formData.city === '') {
            setInvalid(true);
            invalidErrMsgs.push('Please enter City');
        }

        if (formData.zipcode === '') {
            setInvalid(true);
            invalidErrMsgs.push('Please enter Zip Code');
        }

        if (formData.city === '' | formData.zipcode === '') {
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
                setResOTP(result['otp']);
                moveNextPage();
            } else {
                console.error('Msg : ', result['msg']);
                setInvalid(true);
                invalidErrMsgs.push(result['msg']);
            }
        });
    }

    const validateEmailOtp = () => {
        if (formData.otp === resOTP.toString()) {
            console.log('OTP validated successfully');
            moveNextPage();
        } else {
            console.error('Invalid OTP');
            setInvalid(true);
            invalidErrMsgs.push('Please enter correct OTP');
        }
    }

    const resendEmailOtp = () => {
        const headers = {'email_id' : formData.emailid};
        get('api/v1/user/resendEmailOTP', headers).then( (result) => {
            console.log('Msg : ', result['msg']);
            console.log('OTP :', result['otp']);
            setResOTP(result['otp']);
        })
    }

    const mobileNumAvailabilityCheck = () => {
        const headers = {'mobile_num' : formData.mobile};
        get('api/v1/user/mobileNumAvailabilityCheck', headers).then( (result) => {
            if (result['code'] === 200 && result['isAvailable'] === true) {
                console.log('Msg : ', result['msg']);
                moveNextPage();
            } else {
                console.error('Msg : ', result['msg']);
                setInvalid(true);
                invalidErrMsgs.push(result['msg']);
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateFifthStep() === true) {
            flushErrors();
            setInvalid(false);

            const user = {
                'email_id' : formData.emailid,
                'password' : formData.password,
                'user_name' : formData.username,
                'first_name' : formData.firstname,
                'last_name' : formData.lastname,
                'mobile_num' : formData.mobile,
                'city' : formData.city,
                'zip_code' : formData.zipcode
            };
            console.log('User Data : ', user);

            post('api/v1/user/register', user).then( (result) => {
                if (result['code'] === 200) {
                    console.log('Msg :', result['msg']);
                    moveNextPage();
                } else {
                    console.log('Msg :', result['msg']);
                    setInvalid(true);
                    invalidErrMsgs.push(result['msg']);
                }
            });
        } 
    }

    const handleProceed = (e) => {
        e.preventDefault();
        navigate("/home");
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
                                    <Form noValidate onSubmit={handleSubmit}>
                                        { step === 1 && (
                                            <>
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
                                                <div className="row mb-5"></div>
                                                <div className="row mb-5"></div>
                                            </>
                                        )}
                                        { step === 2 && (
                                            <>
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
                                                <div className="row mb-5"></div>
                                                <div className="row mb-5"></div>
                                            </>
                                        )}
                                        { step === 3 && (
                                            <>
                                                <div className="row">
                                                    <div className="col mb-3 text-center">
                                                        <p className="fst-normal">Please enter the OTP sent to your Email</p>
                                                    </div>
                                                </div>
                                                <Form.Group>
                                                    <div className="row">
                                                        <div className="col-3"></div>
                                                        <div className="col-6 mb-3">
                                                            <Form.Control id="otp" name="otp" type="text" value={formData.otp} 
                                                                onChange={handleInputChange} onKeyDown={resetInvalid} 
                                                                placeholder="OTP" required>    
                                                            </Form.Control>
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                                <div className="row">
                                                    <div className="col-6 d-grid gap-2 col mx-auto mt-4 mb-3">
                                                        <button type="button" className="btn btn-success" onClick={resendEmailOtp}>
                                                            Resend OTP
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="row mb-5"></div>
                                                <div className="row mb-5"></div>
                                                <div className="row mb-4"></div>
                                                <div className="row mb-auto"></div>
                                            </>
                                        )}
                                        { step === 4 && (
                                            <>
                                                <div className="row">
                                                    <div className="col mt-3 mb-3 text-center">
                                                        <p className="fst-normal">Enter your Mobile Number</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-3 mb-3"></div>
                                                    <div className="col-6 mb-3">
                                                        <Form.Control id="mobile" name="mobile" type="text" value={formData.mobile} 
                                                            onChange={handleInputChange} onKeyDown={resetInvalid}
                                                            placeholder="Mobile Number" required>
                                                        </Form.Control>
                                                    </div>
                                                </div>
                                                <div className="row mb-5"></div>
                                                <div className="row mb-5"></div>
                                                <div className="row mb-5"></div>
                                                <div className="row mb-5"></div>
                                                <div className="row mb-auto"></div>
                                            </>
                                        )}
                                        { step === 5 && (
                                            <>
                                                <Form.Group>
                                                    <div className="row">
                                                        <div className="col-3"></div>
                                                        <div className="col-6 text-start">
                                                            <Form.Label>City</Form.Label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-3"></div>
                                                        <div className="col-6 mb-3 text-center">
                                                            <Form.Control id="city" name="city" type="text" value={formData.city} 
                                                                onChange={handleInputChange} onKeyDown={resetInvalid} required>
                                                            </Form.Control>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-3"></div>
                                                        <div className="col-6 text-start">
                                                            <Form.Label>Zip Code</Form.Label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-3"></div>
                                                        <div className="col-6 mb-3 text-center">
                                                            <Form.Control id="zipcode" name="zipcode" type="text" value={formData.zipcode} 
                                                                onChange={handleInputChange} onKeyDown={resetInvalid} required>
                                                            </Form.Control>
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                                <div className="row mb-5"></div>
                                                <div className="row mb-5"></div>
                                                <div className="row mb-5"></div>
                                                <div className="row mb-5"></div>
                                            </>
                                        )}
                                        { step === 6 && (
                                            <>
                                                <div className="row">
                                                    <div className="col text-center">
                                                        <p className="fst-normal">User creation is successful.</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col text-center">
                                                        <Icons symbol={'tick'} height={240} width={240}></Icons>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col text-center">
                                                        <p className="fst-normal">Please click on Proceed to Dashboard.</p>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        <div className="row mt-5 mb-2">
                                            <div className="col-6 d-grid gap-2 col mx-auto">
                                                { renderbutton() }
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}