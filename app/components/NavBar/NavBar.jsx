import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';

import style from './style.scss';

function NavBar(props) {
  const { className, actions } = props;
  const wrapperClass = classnames({
    [style.wrapper]: true,
    [className]: !!props.className,
  });

  return (
    <section className={wrapperClass}>
      <Navbar inverse collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a onClick={() => actions.push('/')}>Action Plan</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem
                eventKey={1}
                onClick={() => actions.push('/security-form')}
              >Security Form</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    </section>
  );
}

NavBar.propTypes = {
  className: PropTypes.string,
  actions: PropTypes.object.isRequired,
};

export default NavBar;
