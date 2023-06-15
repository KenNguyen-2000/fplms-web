import { Container, PageBlock } from './style';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// eslint-disable-next-line no-unused-vars
const Pagination = ({ currentPage, setPageNum, totalPages }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <Container number={pageNumbers.length}>
                <ArrowBackIosNewIcon onClick={() => setPageNum((prev) => prev - 1)} />
                {pageNumbers.map((pageNum, index) => (
                    <PageBlock
                        isActive={currentPage == pageNum ? true : false}
                        key={index}
                        onClick={() => setPageNum(pageNum)}
                    >
                        {pageNum}
                    </PageBlock>
                ))}
                <ArrowForwardIosIcon onClick={() => setPageNum((prev) => prev + 1)} />
            </Container>
        </>
    );
};

export default Pagination;
