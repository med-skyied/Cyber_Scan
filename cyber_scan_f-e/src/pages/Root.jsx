
import '../App.css';
import cyberimg from '../assets/cyber-sec-img.png';
import { useNavigate } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';

const Root = () => {
    const navigate = useNavigate();
    function handleStartClick() {
        navigate('/home');
    }
    return (
        <>
        <div className="App-main">
            <p>Welcom to Cyber Scan Project. (a Cyber Security project)</p>
            <p>This project is an app to scan the Internet for infected devices depending on known open ports, and vulnerabilities.</p>
            <p>This is Similer to the Shodan platform.</p>
            <img alt='cyber security image' src={cyberimg} className='Cyber-img-main'></img>
            <h5 className='Start-note'>Note: This is intended for education purposes only, We bear no responsabily for any malicious use of this app functionalities.</h5>
            <button className='Start-button' onClick={handleStartClick}>Enter</button>
            </div>
            
        </>
    )
};
export default Root;