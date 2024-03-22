import Login from './login';

export default function Landing() {
    
    return(
        <>
            <div className="card position-absolute p-3 top-50 start-50 translate-middle mt-5" style={{width:1000, backgroundColor:'#000435'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <Login></Login>
                        </div>
                        <div className="col-6">
                            <div className="row mb-3"></div>
                            <div className="row mb-3">
                                <div className="col">
                                    <img src={process.env.PUBLIC_URL + '/landing-img.jpg'} alt="mobile-img" className="rounded" width={450}></img>
                                </div>
                            </div>
                            <div className='row mb-3'></div>
                            <div className='row mb-5'>
                                <div className='col'>
                                    <img src={process.env.PUBLIC_URL + '/landing2.jpg'} alt='laptop-img' className='rounded' width={450}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}