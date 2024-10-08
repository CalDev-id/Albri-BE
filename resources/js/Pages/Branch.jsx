import React from 'react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import TableFive from '@/Components/Tables/TableFive';

const Branch = ({ cabangs }) => {
    return (
        <DefaultLayout>
            <TableFive initialCabangs={cabangs} /> {/* Kirim data cabang ke TableFive */}
        </DefaultLayout>
    );
}

export default Branch;
