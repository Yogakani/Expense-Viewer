import Login from './login';

export default function Landing() {
    
    return(
       <div className="card position-absolute p-3 top-50 start-50 translate-middle" style={{width:1000}}>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <Login></Login>
                    </div>
                    <div className="col-6">
                        <div className="card border border-0" style={{width:300}}>
                            <div className="card-body">
                                <div className="row mb-5"></div>
                                <div className="row mb-5"></div>
                                <div className="row mb-5"></div>
                                <div className="row mb-5"></div>
                                <div className="row">
                                    <div className="col">
                                        <img src="https://cdn.dribbble.com/userupload/4283394/file/original-1956ecc77f662d432fe185f9668ee218.png?resize=250x" alt="CC-Img" className="rounded" width={450}></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    );
}