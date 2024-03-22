import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import ErrorPopup from './component/ErrorPopup';
import { post } from './util/HttpUtil';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [formData, setFormData] = useState({
        'username' : '',
        'password' : ''
    });
    const [invalid, setInvalid] = useState(false);
    const [invalidErrMsgs] = useState([]);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name] : value});
    }

    function handleSubmit(e) {
       e.preventDefault();
       flushErrors();

       if (validateInput() === true) {

            const user = {
                'user_name' : formData.username,
                'password' : formData.password
            }

            post('api/v1/authenticate', user).then( (res) => {
                console.log("Data from Response : ", res);

                if (res['code'] === 200) {
                    console.log(res['msg']);
                    navigate('/home');
                } else {
                    console.error(res['msg']);
                    setInvalid(true);
                    invalidErrMsgs.push(res['msg']);
                }
            });
       }
    }

    function validateInput() {
        let valid = true;

        if (formData.username === '') {
            setInvalid(true);
            invalidErrMsgs.push(['Please enter User Name']);
        }

        if (formData.password === '') {
            setInvalid(true);
            invalidErrMsgs.push(['Please enter Password']);
        }

        if (formData.username === '' | formData.password === '') {
            valid = !valid;
        }

        return valid;
    }

    function resetInvalid(e) {
        if (invalid && e.key !== '') {
            setInvalid(false);
            flushErrors();
        }
    }

    function flushErrors() {
        invalidErrMsgs.splice(0, invalidErrMsgs.length);
    }

    return(
        <div className="card mt-3 mb-3 p-1 border-end" style={{width:450}}>
            <div className="card-body">
                <div className="row">
                    <div className="col mb-2 text-start">
                        <b>ExpenseViewer</b>
                    </div>
                </div>
                <div className='row'>
                    <div className='col mb-3 text-center'>
                        <img src={process.env.PUBLIC_URL + '/foursquare.png'} alt="logo" className='rounded'></img>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-4 text-center">
                        <h3 className="fst-normal">Login to Your Account!</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3 text-center">
                        <button type="button" className="btn btn-primary">Login with Google</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3 text-center">
                        <p className="text-secondary">- OR -</p>
                    </div>
                </div>
                <div className='container'>
                    <Form noValidate onSubmit={handleSubmit}>
                        {invalid ? ( <ErrorPopup errorMsgs={invalidErrMsgs}></ErrorPopup>) : null}
                        <Form.Group>
                            <div className='row'>
                                <div className='col mb-1'>
                                    <Form.Label>User Name</Form.Label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col mb-3 text-center'>
                                    <Form.Control id='username' name='username' type='text' value={formData.username} 
                                        onChange={handleInputChange} placeholder='user_123' onKeyDown={resetInvalid} required>
                                    </Form.Control>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col mb-1'>
                                    <Form.Label>Password</Form.Label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col mb-2 text-center'>
                                    <Form.Control id='password' name='password' type='password' value={formData.password} 
                                        onChange={handleInputChange} placeholder='*********' onKeyDown={resetInvalid} required>
                                    </Form.Control>   
                                </div>
                            </div>
                        </Form.Group>
                        <div className='row'>
                            <div className='col mb-3 text-end'>
                                <button type='submit' className='btn btn-link'>Forgot Password?</button>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='d-grid gap-2 col mx-auto'>
                                <Button type='submit'>Login</Button>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className='row mb-4'></div>
                <div className='row mb-3'>
                    <div className='col text-center'>
                        <button type='submit' className='btn btn-outline-primary' data-bs-toggle="button" >Create an Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}