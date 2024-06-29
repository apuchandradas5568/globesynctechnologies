import React, { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import Navbar from "../components/Navbar";
import { useTable } from 'react-table';


const Events = () => {
  const [events, setEvents] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    axios
      .get("/events/all-events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        window.alert("Error fetching events");
      });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Event Title',
        accessor: 'eventTitle',
      },
      {
        Header: 'Event Description',
        accessor: 'eventDescription',
      },
      {
        Header: 'Client Name',
        accessor: 'clientName',
      },
      {
        Header: 'Client Mobile',
        accessor: 'clientMobile',
      },
      {
        Header: 'Event Date and Time',
        accessor: 'eventDateTime',
        Cell: ({ value }) => {
          return new Date(value).toLocaleString();
        },
      },
      {
        Header: 'Event Address',
        accessor: 'eventAddress',
      },
      {
        Header: 'Event Location Link',
        accessor: 'eventLocationLink',
        Cell: ({ value }) => {
          return <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>;
        },
      },
    ],
    []
  );

  // Use react-table hooks to create table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: events });

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center pt-12">
      <div className="max-w-6xl">
        <table {...getTableProps()} className="min-w-full bg-white border border-gray-200">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} className="border border-gray-200 px-6 py-3">
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border border-gray-200">
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="border border-gray-200 px-6 py-4">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Events;