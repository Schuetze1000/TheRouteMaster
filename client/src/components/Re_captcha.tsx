import ReCAPTCHA from "react-google-recaptcha"
import { useRef } from 'react';

const Re_captcha = () =>{
    const captchaRef = useRef(null)

    return(
            <form>
                <label htmlFor="name">Name</label>
                    <input type="text" id="name" className="input"/>
                    <ReCAPTCHA
                    sitekey={process.env.REACT_APP_SITE_KEY} 
                    ref={captchaRef}
                    />
                <button>Submit</button>
            </form>
    )
}

export default Re_captcha;