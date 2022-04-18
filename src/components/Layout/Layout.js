import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  padding-bottom: 30px;
  border-bottom: 3px solid grey;
`;

const Navlink = styled(NavLink)`
  color: black;
  font-size: 30px;
  text-decoration: none;

  &.active {
    color: red;
    text-decoration-line: underline;
  }
`;

const Wrapper = styled.div`
  padding: 40px;
`;

const Layout = () => {
  return (
    <Wrapper>
      <Nav>
        <Navlink to="/" activeClassName="active">
          Home
        </Navlink>
        <Navlink to="/movies" activeClassName="active">
          Movies
        </Navlink>
      </Nav>
      <Outlet />
    </Wrapper>
  );
};
export default Layout;
