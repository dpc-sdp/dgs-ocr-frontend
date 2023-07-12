import React from 'react';
import { Space, Tag } from 'antd';
import { useAppContent } from '../contexts/app-context';
import Table, { ColumnsType } from 'antd/es/table';
import { FileContent } from '../interfaces';


const columns: ColumnsType<FileContent> = [
    {
        title: 'Field Name',
        dataIndex: 'field_name',
        key: 'name',
        sorter: (a, b) => a.field_name > b.field_name ? 1 : -1,
    },
    {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
    },
    {
        title: 'Raw Value',
        dataIndex: 'raw_value',
        key: 'raw_value',
    },
    {
        title: 'Value Type',
        dataIndex: 'value_type',
        key: 'value_type',
    },
    {
        title: 'Confidence',
        key: 'confidence',
        dataIndex: 'confidence',
        sorter: (a, b) => a.confidence - b.confidence,
        render: (_, { confidence }) => {
            let color = "volcano";
            if (confidence > 0.5) {
                color = 'green';
            }
            return (
                <Tag color={color} key={confidence}>
                    {confidence}
                </Tag>
            );
        }
        ,
    },
    {
        title: 'Validations',
        key: 'validations',
        render: (_, record) => (
            <Space size="middle" key={record.validations.toString()}>
                {record.validations.map(validation => validation.name)}
            </Space>
        ),
    },
    {
        title: 'Parsers',
        key: 'parsers',
        render: (_, record) => (
            <Space size="middle" key={record.parsers.toString()}>
                {record.parsers.map(parser => parser.name)}
            </Space>
        ),
    },
];

const InfoView: React.FC = () => {
    const { selectedIndex, data } = useAppContent();
    const contentData = (selectedIndex> -1) ? data[selectedIndex].fileContents: [];
    return <Table columns={columns} dataSource={contentData} pagination={false} />
};

export default InfoView;
