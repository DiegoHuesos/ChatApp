import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">


      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ChatApp</span>
        </Link>
      </div>


      <div className="topbarCenter">
        
      </div>

    
      <div className="topbarRight">
        <div className="topbarIcons">  
        
          <Link to="/login" style={{ textDecoration: "none" }}>
            <div className="topbarIconItem">
              Log-out 
              <ExitToAppIcon />
            </div>
          </Link>
        </div>
      </div>


    </div>
  );
}
