import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Login() {

    return(
        <div className="card mt-3 mb-3 p-1 border-end" style={{width:450}}>
            <div className="card-body">
                <div className="row">
                    <div className="col mb-5 text-start">
                        <b>ExpenseViewer</b>
                    </div>
                </div>
                <div className="row mb-5"></div>
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
                    <Form>
                        <Form.Group>
                            <div className='row'>
                                <div className='col mb-1'>
                                    <Form.Label>Email Address</Form.Label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col mb-3 text-center'>
                                    <Form.Control id='emailId' name='emailId' type='text' placeholder='jane@amce.com'></Form.Control>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col mb-1'>
                                    <Form.Label>Password</Form.Label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col mb-5 text-center'>
                                <Form.Control id='password' name='password' type='password' placeholder='..........'></Form.Control>   
                                </div>
                            </div>
                        </Form.Group>
                        <div className='row'>
                            <div className='d-grid gap-2 col mx-auto'>
                                <Button type='submit'>Login</Button>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className='row mb-4'></div>
                <div className='row'>
                    <div className='col mb-3 text-center'>
                        <button type='submit' className='btn btn-link'>Forgot Password?</button>
                    </div>
                </div>
            </div>
        </div>
    );
}