import Error404 from "../../assets/Error404.jpg";


const errorStyle = {
     backgroundSize: 'cover',
     backgroundPosition: 'center',
     height: '100vh',
     backgroundRepeat: 'no-repeat',
     backgroundAttachment: 'fixed',
     boxSizing: 'border-box',
  };

const Error = () => {
    return (
      <div>
        <img src={Error404}  alt="error" style={errorStyle} />
      </div>
    );
  };
  
  export default Error;