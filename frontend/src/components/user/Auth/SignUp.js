import { Link } from 'react-router-dom' 

const SignUp = () => {
    return ( 
        <div className="wrapper">
            <div className="signup text-center">
            <h1>Sign Up as?</h1>
            <Link to="/student" >Student</Link>
           <Link to="/organization">Organization</Link>
            
            
            </div>
            
        </div>
    );
}

export default SignUp;