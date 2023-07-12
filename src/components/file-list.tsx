import React from 'react';
import { Divider, List } from 'antd';
import { ACTION, useAppContent, useAppContentDispatch } from '../contexts/app-context';
import { DocData } from '../interfaces';

const ListItem: React.FC<{ docInfo: DocData, index: number }> = (props) => {
    const dispatch = useAppContentDispatch();
    const { selectedIndex } = useAppContent();
    const { docInfo, index } = props;

    const selectFile = (name: string) => {
        dispatch({
            action: ACTION.SELECT_PDF,
            data: name
        });
    };
    
    return <List.Item
        onClick={() => selectFile(docInfo.fileName)}
        style={(selectedIndex === index) ? { color: "#0958d9" } : {}} >
        {docInfo.fileName}
    </List.Item>
}

const FileList: React.FC = () => {
    const { data } = useAppContent();
    return (data.length > 0) ?
        (
            <>
                <Divider orientation="left">Documents</Divider>
                <List
                    size="small"
                    bordered
                    dataSource={data}
                    renderItem={(item, index) => <ListItem docInfo={item} index={index} />}
                />
            </>
        ) : <></>;
};

export default FileList;