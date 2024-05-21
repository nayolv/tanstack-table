import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import data from '../MOCK_DATA.json'
import dayjs from 'dayjs'
import { useState } from 'react';
export const SimpleTable = () => {

    const columns = [
        {
            header: "ID",
            accessorKey: "id",
            footer: "Mi id",
        },
        // {
        //     header: "Nombre completo",
        //     accessorFn: row => `${row.name} ${row.lastname}`
        // },

        {
            header: "Name",
            accessorKey: "name",
            footer: "Mi nombre",
        },
        {
            header: "Lastname",
            accessorKey: "lastname",
            footer: "Mi apellido",
        },
        {
            header: "Email",
            accessorKey: "email",
            footer: "Mi email",
        },
        {
            header: "Country",
            accessorKey: "country",
            footer: "Mi país",
        },
        {
            header: "Date of Birth",
            accessorKey: "dateOfBirth",
            footer: "Mi fecha de nacimiento",
            cell: info => dayjs(info.getValue()).format("DD-MM-YYYY")
        }
    ];

    const [sorting, setSorting] = useState([]);
    const [filteirng, setFilteirng] = useState('');

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter: filteirng
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFilteirng,
    });
    return (
        <div>
            <input type="text" value={filteirng} onChange={(e) => setFilteirng(e.target.value)} />
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                    {
                                        header.isPlaceholder ? null :
                                            flexRender(header.column.columnDef.header, header.getContext())
                                    }
                                    {
                                        { 'asc': "⬆️", 'desc': "⬇️" }[
                                        header.column.getIsSorted() ?? null]
                                    }
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {
                                    row.getVisibleCells().map((cell) => (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    {
                        table.getFooterGroups().map((footerGroup) => (
                            <tr key={footerGroup.id}>
                                {footerGroup.headers.map((footer) => (
                                    <th key={footer.id}>
                                        {
                                            flexRender(footer.column.columnDef.footer, footer.getContext())
                                        }
                                    </th>
                                ))}
                            </tr>
                        ))
                    }
                </tfoot>
            </table>
            <button onClick={() => table.setPageIndex(0)}>Primer página</button>
            <button onClick={() => table.previousPage()}>Anterior página</button>
            <button onClick={() => table.nextPage()}>Siguiente página</button>
            <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Última página</button>

        </div>
    )
}
