import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import LinkButton from "components/ui/buttons/Link";
import LoadingTableRow from "components/ui/tables/LoadingTableRow";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow";
import Tags from "components/ui/Tags";
import CommandBadge from "./Badge";

const CommandsTable = ({ commands, onDeleteCallback = null }) => {
    return <Table>
        <Thead>
            <Tr>
                <Th style={{ width: '190px' }}>Name</Th>
                <Th className='only-desktop'>Description</Th>
                <Th>Execution environment</Th>
                <Th>Output parser</Th>
                <Th>&nbsp;</Th>
            </Tr>
        </Thead>
        <Tbody>
            {null === commands && <LoadingTableRow numColumns={5} />}
            {null !== commands && 0 === commands.length && <NoResultsTableRow numColumns={5} />}
            {null !== commands && 0 !== commands.length && commands.map(command =>
                <Tr key={command.id}>
                    <Td><CommandBadge command={command} /></Td>
                    <Td className="only-desktop">
                        {command.description}<br />
                        <Tags values={command.tags} />
                    </Td>
                    <Td>{command.executable_type === 'custom' ? 'Host' : 'Container'}</Td>
                    <Td>{command.output_parser ?? '-'}</Td>
                    <Td textAlign="right">
                        <LinkButton href={`/commands/${command.id}/edit`}>Edit</LinkButton>
                        {onDeleteCallback && <DeleteIconButton onClick={() => onDeleteCallback(command.id)} />}
                    </Td>
                </Tr>
            )}
        </Tbody>
    </Table>
}

export default CommandsTable;
