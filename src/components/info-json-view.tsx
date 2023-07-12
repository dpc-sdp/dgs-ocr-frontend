import React from 'react';
import { useAppContent } from '../contexts/app-context';
import { JSONTree } from 'react-json-tree';

const JsonView: React.FC = () => {
    const { selectedIndex, data } = useAppContent();
    const rawData = (selectedIndex > -1) ? data[selectedIndex].rawData : {};
    return (
        <div className='go-left' >
            <JSONTree data={rawData}/>
        </div>

    )
};

export default JsonView;
