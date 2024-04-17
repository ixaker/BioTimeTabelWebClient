export default function LoaderDisconect() {
  return (
    <div style={{
        position: 'fixed',
        bottom: "20px",
        right: "20px",
        width: '80%',
        height: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '30px',
        zIndex: 9999,
        
    }}>
        
        <div 
            className="loader"
            style={{
                
                fontSize: '40px',
                fontWeight: '600',
                color: 'white',
                textShadow: '2px 2px 2px #000'
                
            }}
        >
            Зв'язок з севером втрачено ...
    
        </div>
    </div>
  )
}
