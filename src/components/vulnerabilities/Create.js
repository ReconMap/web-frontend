import { actionCompletedToast } from 'components/ui/toast';
import useQuery from 'hooks/useQuery';
import VulnerabilityModel from 'models/Vulnerability';
import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useSetTitle from "../../hooks/useSetTitle";
import secureApiFetch from "../../services/api";
import Breadcrumb from '../ui/Breadcrumb';
import { IconPlus } from '../ui/Icons';
import Title from '../ui/Title';
import VulnerabilityForm from "./Form";

const VulnerabilityCreate = () => {

    useSetTitle('Add vulnerability');

    const history = useHistory();
    const query = useQuery();
    const urlProjectId = useRef(query.get('projectId') || 0);

    const [vulnerability, setVulnerability] = useState({ ...VulnerabilityModel, project_id: urlProjectId.current })

    const onFormSubmit = ev => {
        ev.preventDefault();

        secureApiFetch(`/vulnerabilities`, { method: 'POST', body: JSON.stringify(vulnerability) })
            .then(() => {

                if (vulnerability.is_template) {
                    history.push('/vulnerabilities/templates');
                } else {
                    history.push(`/vulnerabilities`);
                }

                actionCompletedToast(`The vulnerability "${vulnerability.summary}" has been added.`);
            });
    };

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/vulnerabilities">Vulnerabilities</Link>
                </Breadcrumb>
            </div>
            <Title title="New vulnerability details" icon={<IconPlus />} />

            <VulnerabilityForm vulnerability={vulnerability} vulnerabilitySetter={setVulnerability}
                onFormSubmit={onFormSubmit} />
        </div>
    )
};

export default VulnerabilityCreate;
