
  import React from 'react';
  import styles from './modal.module.css'; 
  
  const CloseButton: React.FC = () => {
    return (
      <button className={styles.closeButton}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z"/>
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    );
  };
  
  export default CloseButton;