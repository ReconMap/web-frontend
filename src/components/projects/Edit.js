import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import secureApiFetch from "../../services/api";
import Breadcrumb from '../ui/Breadcrumb';
import { IconPlus } from "../ui/Icons";
import Loading from "../ui/Loading";
import Title from '../ui/Title';
import { actionCompletedToast } from "../ui/toast";
import ProjectForm from "./Form";

const ProjectEdit = ({ history }) => {
    const { projectId } = useParams();
    const [serverProject] = useFetch(`/projects/${projectId}`);
    const [clientProject, setClientProject] = useState(null);

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/projects/${projectId}`, { method: 'PUT', body: JSON.stringify(clientProject) })
        actionCompletedToast(`Project "${clientProject.name}" updated.`);

        if (clientProject.is_template) {
            history.push(`/projects/templates/${projectId}`);
        } else {
            history.push(`/projects/${projectId}`);
        }
    };

    useEffect(() => {
        setClientProject(serverProject);
    }, [serverProject]);

    if (!serverProject || !clientProject) {
        return <Loading />
    }

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                    <Link to={`/projects/${serverProject.id}`}>{serverProject.name}</Link>
                </Breadcrumb>
            </div>
            <Title title="Project details" icon={<IconPlus />} />

            <ProjectForm isEdit={true} project={clientProject} projectSetter={setClientProject}
                onFormSubmit={onFormSubmit} />
        </div>
    )
}

export default ProjectEdit;
