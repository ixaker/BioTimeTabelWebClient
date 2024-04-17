import { useEffect, useRef } from 'react';

const ScreenActivityTimeout = () => {
    const wakeLockRef = useRef<any>(null);

    if ("wakeLock" in navigator) {
        alert('wake lock is supported by this browser');
      } else {
        alert('wake lock is not supported in this browser')
      }
    
    const requestWakeLock = async () => {
        try {
            if ('wakeLock' in navigator) {
                wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
                console.log('Screen Wake Lock запитаний успішно');
                alert('Screen Wake Lock запитаний успішно');
            } else {
                console.log('Screen Wake Lock не підтримується в цьому браузері');
                alert('Screen Wake Lock не підтримується в цьому браузері');
            }
        } catch (error) {
            console.error('Помилка під час запиту Screen Wake Lock:', error);
            alert(`Помилка під час запиту Screen Wake Lock: ${error}`);
        }
    };

    useEffect(() => {
        requestWakeLock();

        return () => {
            if (wakeLockRef.current) {
                wakeLockRef.current.release();
                console.log('Screen Wake Lock відпущений');
                alert('Screen Wake Lock відпущений');
            }
        };
    }, []);

    return null;
};

export default ScreenActivityTimeout;
