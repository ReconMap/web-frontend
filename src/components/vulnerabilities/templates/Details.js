import CvssScore from 'components/badges/CvssScore';
import RiskBadge from 'components/badges/RiskBadge';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import Breadcrumb from 'components/ui/Breadcrumb';
import ButtonGroup from 'components/ui/buttons/ButtonGroup';
import DeleteButton from 'components/ui/buttons/Delete';
import LinkButton from 'components/ui/buttons/Link';
import PrimaryButton from 'components/ui/buttons/Primary';
import ExternalLink from 'components/ui/ExternalLink';
import { IconFlag, IconPlusCircle } from 'components/ui/Icons';
import Loading from 'components/ui/Loading';
import Tab from 'components/ui/Tab';
import Tabs from 'components/ui/Tabs';
import TimestampsSection from 'components/ui/TimestampsSection';
import Title from 'components/ui/Title';
import UserLink from 'components/users/Link';
import useDelete from 'hooks/useDelete';
import useFetch from 'hooks/useFetch';
import useSetTitle from 'hooks/useSetTitle';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import secureApiFetch from 'services/api';
import CvssAbbr from '../CvssAbbr';
import VulnerabilityStatusBadge from '../StatusBadge';


const TemplateDetails = ({ history, match }) => {
    useSetTitle('Vulnerability template');
    const [vulnerability] = useFetch(`/vulnerabilities/${match.params.templateId}`)

    const cloneProject = async (templateId) => {
        secureApiFetch(`/vulnerabilities/${templateId}/clone`, { method: 'POST' })
            .then(resp => resp.json())
            .then(data => {
                history.push(`/vulnerabilities/${data.vulnerabilityId}/edit`);
            });
    }

    const destroy = useDelete('/vulnerabilities/', () => {
        history.push('/vulnerabilities/templates');
    });

    if (!vulnerability) return <Loading />

    return (
        <>
            <div>
                <div className='heading'>
                    <Breadcrumb>
                        <Link to="/vulnerabilities">Vulnerabilities</Link>
                        <Link to="/vulnerabilities/templates">Templates</Link>
                    </Breadcrumb>
                    <ButtonGroup>
                        <PrimaryButton onClick={() => cloneProject(vulnerability.id)}><IconPlusCircle
                        /> Clone and edit</PrimaryButton>

                        <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                            <LinkButton href={`/vulnerabilities/${vulnerability.id}/edit`}>Edit</LinkButton>
                            <DeleteButton onClick={() => destroy(vulnerability.id)} />
                        </RestrictedComponent>
                    </ButtonGroup>
                </div>
                <article>
                    <Title type='Vulnerability template' title={vulnerability.summary} icon={<IconFlag />} />

                    <Tabs>
                        <Tab name="Details">
                            <div className="grid grid-two">
                                <div>
                                    <h4>Description</h4>
                                    <ReactMarkdown>{vulnerability.description || "_(empty)_"}</ReactMarkdown>
                                    {vulnerability.solution &&
                                        <>
                                            <h4>Solution</h4>
                                            <ReactMarkdown>{vulnerability.solution}</ReactMarkdown>
                                        </>
                                    }

                                    <h4>Proof of concept</h4>
                                    <ReactMarkdown>{vulnerability.proof_of_concept || "_(empty)_"}</ReactMarkdown>

                                    <h4>Impact</h4>
                                    <ReactMarkdown>{vulnerability.impact || "_(empty)_"}</ReactMarkdown>

                                    <h4>Properties</h4>
                                    <dl>
                                        <dt>Status</dt>
                                        <dd><VulnerabilityStatusBadge vulnerability={vulnerability} /></dd>

                                        <dt>Risk</dt>
                                        <dd><RiskBadge risk={vulnerability.risk} /></dd>

                                        <dt>Category</dt>
                                        <dd>{vulnerability.category_name || '-'}</dd>

                                        <dt><CvssAbbr /> score</dt>
                                        <dd><CvssScore score={vulnerability.cvss_score} /></dd>

                                        <dt>CVSS vector</dt>
                                        <dd><ExternalLink
                                            href={`https://www.first.org/cvss/calculator/3.0#${vulnerability.cvss_vector}`}>{vulnerability.cvss_vector}</ExternalLink>
                                        </dd>
                                    </dl>
                                </div>

                                <div>
                                    <h4>Relations</h4>
                                    <dl>
                                        <dt>Created by</dt>
                                        <dd><UserLink userId={vulnerability.creator_uid}>{vulnerability.creator_full_name}</UserLink></dd>
                                    </dl>

                                    <TimestampsSection entity={vulnerability} />
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </article>
            </div>
        </>
    )
}

export default TemplateDetails;
