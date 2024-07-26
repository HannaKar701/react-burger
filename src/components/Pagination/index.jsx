import React from 'react';
import BasicPagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Pagination = ({ page, onChangePage }) => {
    const handleChange = (event, value) => {
        onChangePage(value);
    };

    return (
        <Stack spacing={2}>
            <BasicPagination count={3} size="large" page={page} onChange={handleChange} />
        </Stack>
    );
};

export default Pagination;
