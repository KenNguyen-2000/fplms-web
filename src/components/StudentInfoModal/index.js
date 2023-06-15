import badge from '../../assets/ribbon.png';
import Overlay from '../Overlay';
import { Avatar, Content, Wrapper, Left, Right, Label, Infomation, Badge } from './style';

const StudentInfoModal = ({ isOpen, studentInfo, setOpen }) => {
    return (
        <Overlay isOpen={isOpen} closeFn={setOpen}>
            <Wrapper>
                <Avatar>
                    <img src={studentInfo?.picture} />
                </Avatar>
                <Badge>
                    <img src={badge} />
                    <div>{studentInfo?.point}</div>
                </Badge>
                <Content>
                    <Left></Left>
                    <Right>
                        <Label fS={'30px'} bold={true}>
                            Student Infomation
                        </Label>
                        <Infomation>{studentInfo?.name}</Infomation>
                        <Infomation>{studentInfo?.email}</Infomation>
                    </Right>
                </Content>
            </Wrapper>
        </Overlay>
    );
};

export default StudentInfoModal;
