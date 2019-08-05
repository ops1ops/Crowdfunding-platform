import React from 'react';
import { Table } from 'antd';
import { PropTypes } from 'prop-types';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import sortByAlphabet from '../../../utils/sortByAlphabet';
import DeleteCampaignModal from '../../CampaignPage/DeleteCampaignModal/component';

function CapaignsTab(props) {
    const { campaigns, deleteCampaign, isLoading } = props;

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            render: (text, record) => <Link to={`/campaign/${record.key}`}>{text}</Link>,
            sorter: sortByAlphabet,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Category',
            dataIndex: 'category',
            sorter: sortByAlphabet,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Current amount',
            dataIndex: 'currentAmount',
            sorter: (a, b) => b.currentAmount - a.currentAmount,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Goal amount',
            dataIndex: 'goalAmount',
            sorter: (a, b) => b.goalAmount - a.goalAmount,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            sorter: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Expiration date',
            dataIndex: 'expirationDate',
            sorter: (a, b) => new Date(b.expirationDate) - new Date(a.expirationDate),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <div>
                    <Link
                        to={`/campaign/edit/${record.key}`}
                        className="btn btn-sm btn-outline-success w-75"
                    >
                        Edit
                    </Link>
                    <DeleteCampaignModal
                        isLoading={isLoading}
                        buttonVariant="btn-sm w-75 mt-1"
                        id={record.key}
                        deleteCampaign={deleteCampaign}
                    />
                </div>
            ),
        },
    ];

    const data = campaigns.map(campaign => {
        return {
            key: campaign.id,
            title: campaign.title,
            category: campaign.category.name,
            currentAmount: campaign.currentAmount,
            goalAmount: campaign.goalAmount,
            createdAt: moment(campaign.createdAt).format('DD MMM YYYY'),
            expirationDate: moment(campaign.expirationDate).format('DD MMM YYYY'),
        };
    });

    return (
        <Container>
            {data.length ? (
                <Table
                    align="center"
                    columns={columns}
                    dataSource={data}
                    className="border mt-2"
                    pagination={false}
                />
            ) : (
                <p className="text-center h6 mt-2">
                    No campaigns yet. You can <Link to="/campaigns/create">create</Link> it
                </p>
            )}
        </Container>
    );
}

CapaignsTab.propTypes = {
    campaigns: PropTypes.object.isRequired,
    deleteCampaign: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default CapaignsTab;
