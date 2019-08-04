import React from 'react';
import { PropTypes } from 'prop-types';
import * as moment from 'moment';
import { Table } from 'antd';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function RewardsTab(props) {
    const { rewards } = props;

    const columns = [
        {
            title: 'Supported campaign',
            dataIndex: 'campaign',
            render: (text, record) => (
                <Link to={`/campaign/${record.campaignId}`}>{text}</Link>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Received at',
            dataIndex: 'createdAt',
            sorter: (a, b) => new Date(b.date) - new Date(a.date),
            sortDirections: ['descend', "ascend"],
        },
    ];

    const data = rewards.map(reward => {
        return {
            key: reward.id,
            campaignId: reward.campaign.id,
            campaign: reward.campaign.title,
            name: reward.name,
            description: reward.description,
            amount: reward.amount,
            date: reward.user_rewards.createdAt,
            createdAt: moment(reward.user_rewards.createdAt).format('DD MMM YYYY'),
        };
    });

    return (
        <Container className="px-5">
            <Table
                al
                columns={columns}
                dataSource={data}
                className="border mt-2"
                size="middle"
                pagination={false}
            />
        </Container>
    );
}

RewardsTab.propTypes = {
    rewards: PropTypes.array.isRequired,
};

export default RewardsTab;
