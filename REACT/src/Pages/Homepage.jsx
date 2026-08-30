
import { Link } from "react-router-dom";

const Homepage = () => {
   
    return ( 
        <>
        <h1>Homepage</h1>

       <nav 
       style={{
        display:"flex",
        flexDirection: "column",
        gap: 10,
        fontSize: 30
       }}>
        <Link to='/movies'>Movies</Link>
        <Link to='/games'>Games</Link>
        <Link to='/dreams'>Dreams</Link>
        <Link to='/crud'>CRUD</Link>
        <Link to='/books'>Books</Link>
        <a href="http://localhost:3000/api/auth/google">Sign in with Google</a>
       </nav>
        

        
        </>
     );
}
 
export default Homepage;