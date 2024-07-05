import React from "react";
import '../App.css'


import NavBarChild from '../components/NavBarChild';
import Footer from '../components/Footer';

export default function CVEsSearch() {



    return (
        <>
            <NavBarChild />
            <div className="main_container">
                <div className="cves_pages">
                    <div className="cve_inner_holder">
                        <p>This Service permitts you to explore the CVEs (common vulnerability Exposures)
                            known also as software exploits, that have been designed and exploiated in the past.</p>
                        <p>Some of the systems online are still affected by these vulnerabilities even though they are patched (some new ones might not be patched yet).
                            So be careafull and responsible, We trust you with this.</p>
                           <form className="cve_input_form">
                                <p>Provide the year the desired CVEs were introduced in (1999-the  current year)</p>
                                <input required id="cves_year"></input><span> use only numbers</span><br/> <br/>
                                <button type="submit">Search</button>
                            </form>
                        </div>
                    

                </div>
            </div>
            <Footer />
        </>
    )
}
