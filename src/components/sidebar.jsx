import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import Admin from './Navigation/Admin';
import Employee from './Navigation/Employee';

const SideBar = () => {

  const { user } = useSelector(state => state.authSlice);

  return (
    <div className="main-sidebar">
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <NavLink to="/home">Mini HRMS</NavLink>
        </div>
        {
          (user.type === 'Admin') ? <Admin /> : <Employee />
        }
      </aside>
    </div>
  )
}

export default SideBar;