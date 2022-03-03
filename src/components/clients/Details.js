import { Button, ButtonGroup, Input, Select, Tab, Table, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import ProjectsTable from 'components/projects/Table';
import DeleteIconButton from 'components/ui/buttons/DeleteIconButton';
import EmptyField from 'components/ui/EmptyField';
import MailLink from 'components/ui/MailLink';
import NoResultsTableRow from 'components/ui/tables/NoResultsTableRow';
import TelephoneLink from 'components/ui/TelephoneLink';
import TimestampsSection from 'components/ui/TimestampsSection';
import { actionCompletedToast, errorToast } from 'components/ui/toast';
import UserLink from 'components/users/Link';
import Contact from 'models/Contact';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import secureApiFetch from 'services/api';
import Breadcrumb from "../ui/Breadcrumb";
import DeleteButton from '../ui/buttons/Delete';
import EditButton from "../ui/buttons/Edit";
import ExternalLink from "../ui/ExternalLink";
import { IconBriefcase } from '../ui/Icons';
import Title from '../ui/Title';
import useDelete from './../../hooks/useDelete';
import useFetch from './../../hooks/useFetch';
import Loading from './../ui/Loading';

const ClientProjectsTab = ({ clientId }) => {
    const [projects] = useFetch(`/projects?clientId=${clientId}`);

    if (!projects) return <Loading />

    if (projects.length === 0) {
        return <div>
            This client has no projects. You can see all projects and their clients <Link to="/projects">here</Link>.
        </div>
    }

    return <div>
        <ProjectsTable projects={projects} showClientColumn={false} />
    </div>
}

const ClientDetails = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();

    const [client] = useFetch(`/clients/${clientId}`);
    const [contacts, fetchContacts] = useFetch(`/clients/${clientId}/contacts`);

    const [contact, setContact] = useState(new Contact());

    const onContactFormChange = ev => {
        setContact({ ...contact, [ev.target.name]: ev.target.value });
    }


    const deleteClient = useDelete(`/clients/`)
    const [logo, setLogo] = useState(null);
    const [smallLogo, setSmallLogo] = useState(null);

    const handleDelete = async () => {
        const confirmed = await deleteClient(clientId);
        if (confirmed)
            navigate('/clients');
    }

    const onFormSubmit = ev => {
        ev.preventDefault();

        secureApiFetch(`/clients/${clientId}/contacts`, { method: 'POST', body: JSON.stringify(contact) })
            .then(resp => {
                if (resp.status === 201) {
                    setContact(new Contact());
                    fetchContacts();
                    actionCompletedToast(`The contact has been added.`);
                } else {
                    errorToast("The contact could not be saved. Review the form data or check the application logs.")
                }
            })
    }

    const onContactDelete = contactId => {
        secureApiFetch(`/contacts/${contactId}`, { method: 'DELETE' })
            .then(() => {
                fetchContacts();
                actionCompletedToast("The contact has been deleted.");
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        if (client) {
            if (client.small_logo_attachment_id) {
                downloadAndDisplayLogo(client.small_logo_attachment_id, 'small_logo');
            }

            if (client.logo_attachment_id) {
                downloadAndDisplayLogo(client.logo_attachment_id, 'logo');
            }
        }
    }, [client]);

    const downloadAndDisplayLogo = (logoId, type) => {
        secureApiFetch(`/attachments/${logoId}`, { method: 'GET' })
            .then(resp => {
                const contentDispositionHeader = resp.headers.get('Content-Disposition');
                const filenameRe = new RegExp(/filename="(.*)";/)
                const filename = filenameRe.exec(contentDispositionHeader)[1]
                return Promise.all([resp.blob(), filename]);
            })
            .then((values) => {
                const blob = values[0];
                const url = URL.createObjectURL(blob);
                if (type === 'small_logo') {
                    setSmallLogo(url);
                } else {
                    setLogo(url);
                }
            })
    }

    if (!client) {
        return <Loading />
    }

    return <div>
        <div className='heading'>
            <Breadcrumb>
                <Link to="/clients">Clients</Link>
            </Breadcrumb>
            <ButtonGroup>
                <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                    <EditButton onClick={(ev) => {
                        ev.preventDefault();
                        navigate(`/clients/${client.id}/edit`)
                    }}>Edit</EditButton>
                    <DeleteButton onClick={handleDelete} />
                </RestrictedComponent>
            </ButtonGroup>
        </div>
        <article>
            <div>
                <PageTitle value={`${client.name} client`} />
                <Title type='Client' title={client.name} icon={<IconBriefcase />} />
            </div>

            <Tabs isLazy>
                <TabList>
                    <Tab>Details</Tab>
                    <Tab>Contacts</Tab>
                    <Tab>Projects</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div className="grid grid-two">
                            <div>
                                <h4>Properties</h4>

                                <dl>
                                    <dt>Address</dt>
                                    <dd>{client.address ?? '-'}</dd>

                                    <dt>URL</dt>
                                    <dd><ExternalLink href={client.url}>{client.url}</ExternalLink></dd>
                                </dl>

                                <h4>Branding</h4>

                                <dl>
                                    <dt>Main logo</dt>
                                    <dd>{logo ? <img src={logo} alt="The main logo" /> : <EmptyField />}</dd>

                                    <dt>Small logo</dt>
                                    <dd>{smallLogo ? <img src={smallLogo} alt="The smaller version of the logo" /> : <EmptyField />}</dd>
                                </dl>
                            </div>

                            <div>
                                <h4>Relations</h4>
                                <dl>
                                    <dt>Created by</dt>
                                    <dd><UserLink userId={client.creator_uid}>{client.creator_full_name}</UserLink></dd>
                                </dl>

                                <TimestampsSection entity={client} />
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <h4>Contacts</h4>

                        {contacts && <>
                            <form onSubmit={onFormSubmit}>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>Kind</Th>
                                            <Th>Name</Th>
                                            <Th>Role</Th>
                                            <Th>Email</Th>
                                            <Th>Phone</Th>
                                            <Th>&nbsp;</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>
                                                <Select name="kind" onChange={onContactFormChange} value={contact.kind || ""} isRequired>
                                                    <option value="general">General</option>
                                                    <option value="technical">Technical</option>
                                                    <option value="billing">Billing</option>
                                                </Select>
                                            </Td>
                                            <Td>
                                                <Input type="text" name="name" onChange={onContactFormChange} value={contact.name || ""} isRequired />
                                            </Td>
                                            <Td>
                                                <Input type="text" name="role" onChange={onContactFormChange} value={contact.role || ""} />
                                            </Td>
                                            <Td>
                                                <Input type="email" name="email" onChange={onContactFormChange} value={contact.email || ""} isRequired />
                                            </Td>
                                            <Td>
                                                <Input type="tel" name="phone" onChange={onContactFormChange} value={contact.phone || ""} />
                                            </Td>
                                            <Td>
                                                <Button type="submit">Add</Button>
                                            </Td>
                                        </Tr>
                                        {0 === contacts.length && <NoResultsTableRow numColumns={6} />}
                                        {contacts.map(contact => <>
                                            <Tr key={contact.id}>
                                                <Td>{contact.kind}</Td>
                                                <Td>{contact.name}</Td>
                                                <Td>{contact.role}</Td>
                                                <Td><MailLink email={contact.email} /></Td>
                                                <Td><TelephoneLink number={contact.phone} /></Td>
                                                <Td><DeleteIconButton onClick={onContactDelete.bind(this, contact.id)} /></Td>
                                            </Tr>
                                        </>)}
                                    </Tbody>
                                </Table>
                            </form>
                        </>}
                    </TabPanel>
                    <TabPanel>
                        <ClientProjectsTab clientId={clientId} />
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </article>
    </div>
}

export default ClientDetails;
