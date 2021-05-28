import BadgeOutline from 'components/badges/BadgeOutline';
import ProjectBadge from 'components/projects/ProjectBadge';
import Breadcrumb from 'components/ui/Breadcrumb';
import CreateButton from 'components/ui/buttons/Create';
import DeleteButton from 'components/ui/buttons/Delete';
import PrimaryButton from 'components/ui/buttons/Primary';
import { IconDocumentDuplicate, IconPlus } from 'components/ui/Icons';
import Loading from 'components/ui/Loading';
import NoResults from 'components/ui/NoResults';
import Title from 'components/ui/Title';
import useDelete from 'hooks/useDelete';
import useFetch from 'hooks/useFetch';
import useSetTitle from 'hooks/useSetTitle';
import { Link } from 'react-router-dom';
import secureApiFetch from 'services/api';

const TemplatesList = ({ history }) => {
    useSetTitle('Project templates');
    const [templates, updateTemplates] = useFetch('/projects?isTemplate=1')

    const cloneProject = (ev, templateId) => {
        ev.stopPropagation();

        secureApiFetch(`/projects/${templateId}/clone`, { method: 'POST' })
            .then(resp => resp.json())
            .then(data => {
                history.push(`/projects/${data.projectId}/edit`);
            });
    }

    const viewProject = (templateId) => {
        history.push(`/projects/templates/${templateId}`);
    }

    const destroy = useDelete('/projects/', updateTemplates);

    const deleteTemplate = (ev, templateId) => {
        ev.stopPropagation();

        destroy(templateId);
    }

    return (
        <>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                </Breadcrumb>

                <CreateButton onClick={() => history.push('/system/import-data')}>Import template(s)</CreateButton>
            </div>
            <Title title='Project templates' icon={<IconDocumentDuplicate />} />
            {!templates ? <Loading /> :
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '190px' }}>Name</th>
                            <th>Description</th>
                            <th style={{ width: '16ch' }}>Number of tasks</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {templates.length === 0 ?
                            <td colSpan="5"><NoResults /></td>
                            :
                            templates.map((template) =>
                                <tr key={template.id} onClick={() => viewProject(template.id)}>
                                    <td><ProjectBadge project={template} /></td>
                                    <td className='truncate'>{template.description}</td>
                                    <td><BadgeOutline>{template.num_tasks}</BadgeOutline></td>
                                    <td className='flex justify-end'>
                                        <PrimaryButton onClick={ev => cloneProject(ev, template.id)} key={template.id}
                                            title="Clone"><IconPlus />Clone and edit</PrimaryButton>
                                        <DeleteButton onClick={ev => deleteTemplate(ev, template.id)} />
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            }
        </>
    )
}

export default TemplatesList;
