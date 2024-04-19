export const getWebSocketUrl = (): string => {
    const urlParams = new URLSearchParams(window.location.search);
    const socketUrl = urlParams.get('ip');

    return socketUrl ? socketUrl : 'http://192.168.0.110:3000';
};


//   

export const getTerminalSerialNumbers = (): string[] => {
    const urlParams = new URLSearchParams(window.location.search);
    const serialNumbers: string[] = [];
    const snOfProduction = 'CN99212360024';
    
    if (urlParams.has('sn1')) {
        serialNumbers.push(urlParams.get('sn1') || '');
    }
    if (urlParams.has('sn2')) {
        serialNumbers.push(urlParams.get('sn2') || '');
    }
    if (urlParams.has('sn3')) {
        serialNumbers.push(urlParams.get('sn3') || '');
    }

    return serialNumbers.length > 0 ? serialNumbers : [snOfProduction];
};