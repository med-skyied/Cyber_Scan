import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

function Footer() {
  const [systemStatus, setSystemStatus] = useState(null);

  useEffect(() => {
    fetchSystemStatus();
  }, []);

  async function fetchSystemStatus() {
    const apiEndPoint = "http://localhost:5000/api/v1/";
    try {
      const response = await axios.get(apiEndPoint.concat("/status"));
      const status = response.data.sys_status;
      setSystemStatus(status);
    } catch (error) {
      console.error("API errors were found:", error);
      setSystemStatus("failed");
    }
  }

  return (
    <div className="Footer">
      <span className="sys_status_txt">System Status:</span>
      <div id="status_dot">
        {systemStatus === "Success" ? (
          <div className="green-dot"></div>
        ) : (
          <div className="red-dot"></div>
        )}
      </div>
      <div id="status_holder">
        {systemStatus === "Success" ? (
          <span className="system_status_ok">
            &nbsp;All systems are operational.
          </span>
        ) : (
          <span className="system_status_failed">
            &nbsp;API endpoints are not responding.
          </span>
        )}
      </div>
    </div>
  );
}

export default Footer;
