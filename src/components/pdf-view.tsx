import React from 'react';
import { useAppContent } from '../contexts/app-context';

const PDFView: React.FC = () => {
    const { selectedIndex, data } = useAppContent();
    const pdf = (selectedIndex > -1) ? data[selectedIndex].pdf : "";
    return <div style={{ width: "100%", height: "100%" }}>
        <embed style={{ width: "100%", height: "100%" }} src={pdf} />
    </div>
};

export default PDFView;