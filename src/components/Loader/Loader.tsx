import * as Components from 'react-loader-spinner';

function Block() {
  return (
    <Components.Grid
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
    />
  );
}
export default function Loader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      
    }}>
        <Block />
        <div 
            className="loader"
            style={{
                marginTop: '50px',
                fontSize: '30px',
                
            }}
        >
            Встановлюється зв'язок з сервером...
    
        </div>
    </div>
  )
}
