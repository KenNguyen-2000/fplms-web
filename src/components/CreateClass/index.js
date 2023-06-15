import { Container } from './style';

import AddIcon from '@mui/icons-material/Add';

const CreateClass = ({ setCreate }) => {
    const show = () => {
        setCreate((isCreate) => !isCreate);
    };

    return (
        <Container onClick={show}>
            <AddIcon />
        </Container>
    );
};

export default CreateClass;
