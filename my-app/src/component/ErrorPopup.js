export default function ErrorPopup({errorMsgs}) {

    return(
        <div className='row'>
            <div className='col mb-3 alert alert-warning text-start' role='alert'>
                {errorMsgs.map(errMsg => (
                    <li key={errMsg}>{errMsg}</li>
                ))}
            </div>
        </div>
    );
}