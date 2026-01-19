
import './Header.css'

// name="that dude"
function Header(props) {
  return (
    <header className="main-header">
      <h1>Welcome "{props.user}"</h1>
    </header>
  );
}
export default Header;
