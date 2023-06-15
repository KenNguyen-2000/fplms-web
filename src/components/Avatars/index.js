import { stringToColour } from '../../utils/style';
import { GroupAvatar, Avatar } from './style';

const Avatars = ({ list, max, outline }) => {
    list = list || [];
    max = max || 5;

    const More = () => {
        if (list.length - max > 0) {
            return (
                <Avatar size={32} color="#5680F9">
                    <span>+{list.length - max}</span>
                </Avatar>
            );
        } else {
            return null;
        }
    };

    return (
        <GroupAvatar>
            {list.slice(0, max).map((avatar, index) => (
                <Avatar
                    outline={outline}
                    key={index}
                    size={32}
                    color={stringToColour(avatar + list.join(''))}
                >
                    <span>{avatar}</span>
                </Avatar>
            ))}
            <More />
        </GroupAvatar>
    );
};

export default Avatars;
