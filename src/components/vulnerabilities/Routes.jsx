import LibraryLayout from "components/LibraryLayout";
import { Route } from "react-router-dom";
import VulnerabilityCreate from "./Create";
import VulnerabilityDetails from "./Details";
import VulnerabilityEdit from "./Edit";
import VulnerabilitiesList from "./List";

const VulnerabilitiesRoutes = [
    <Route path="/vulnerabilities" element={<LibraryLayout />}>
        <Route index element={<VulnerabilitiesList />} />,
        <Route path={`create`} element={<VulnerabilityCreate />} />,
        <Route path={`:vulnerabilityId`} element={<VulnerabilityDetails />} />,
        <Route path={`:vulnerabilityId/edit`} element={<VulnerabilityEdit />} />
    </Route>,
];

export default VulnerabilitiesRoutes;
