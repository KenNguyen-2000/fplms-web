import { StyledContainer, ActiveMember, MemberInfo, Avatar, Comments } from './style';

const TopActivities = ({ arr }) => {
    return (
        <StyledContainer>
            {arr
                ?.sort((a, b) => b.value - a.value)
                .map((item) => (
                    <ActiveMember key={item.name}>
                        <MemberInfo>
                            <Avatar />
                            <span>{item.name}</span>
                        </MemberInfo>
                        <Comments>{item.point}</Comments>
                    </ActiveMember>
                ))}
        </StyledContainer>
    );
};

export default TopActivities;
