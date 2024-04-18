import { useState, useEffect } from 'react';
import { useAppContext } from '../../State/AppProvider';

const DataLoadingComponent = () => {
    const { state } = useAppContext();
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        if (state.data.length > 0) {
            setIsDataLoaded(true);
        }
    }, [state.data]);

    return isDataLoaded;
};

export default DataLoadingComponent;
