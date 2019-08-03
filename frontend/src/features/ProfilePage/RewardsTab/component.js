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
            width: '25%'
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
            date: reward.user_rewards.createdAt,
            createdAt: moment(reward.user_rewards.createdAt).format('DD MMM YYYY'),
        };
    });

    return (
        <Container>
            <Table
                columns={columns}
                dataSource={data}
                className="border mt-2"
                pagination={false}
            />
        </Container>
    );
}

RewardsTab.propTypes = {
    rewards: PropTypes.array.isRequired,
};

export default RewardsTab;
