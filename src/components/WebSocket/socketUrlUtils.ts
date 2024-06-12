export const getWebSocketUrl = (): string => {
    const urlParams = new URLSearchParams(window.location.search);
    const socketUrl = urlParams.get('ip');
    console.log('socketUrl', socketUrl);
    let hostname = window.location.hostname;
    if (hostname === 'localhost') {
        hostname = '10.8.0.4';
    }

    return socketUrl ? socketUrl : `${hostname}:3000`;
};

export const getTerminalSerialNumbers = (): string[] => {
    const urlParams = new URLSearchParams(window.location.search);
    const serialNumbers: string[] = [];
    const snOfProduction = 'CN99212360024';
    const localStorageKey = 'serialNumbers';

    if (urlParams.has('sn1')) {
        serialNumbers.push(urlParams.get('sn1') || '');
    }
    if (urlParams.has('sn2')) {
        serialNumbers.push(urlParams.get('sn2') || '');
    }
    if (urlParams.has('sn3')) {
        serialNumbers.push(urlParams.get('sn3') || '');
    }

    if (serialNumbers.length > 0) {
        localStorage.setItem(localStorageKey, JSON.stringify(serialNumbers));
    } else {
        const storedSerialNumbers = localStorage.getItem(localStorageKey);
        if (storedSerialNumbers) {
            return JSON.parse(storedSerialNumbers);
        } else {
            return [snOfProduction];
        }
    }

    return serialNumbers.length > 0 ? serialNumbers : [snOfProduction];
};