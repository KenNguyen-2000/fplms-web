import { useState } from 'react';

import { chunkArray } from '../../utils/array';
import { COLOR } from '../../utils/color';
import { getFullBoardDays, getMonthString } from '../../utils/dateTime';
import {
    Container,
    StyledHeader,
    Row,
    RowContainer,
    StyledDateTime,
    StyledDay,
    Flip,
    StyledMonth,
} from './style';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Calendar = ({ onChange }) => {
    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    const [today, setToday] = useState(new Date());

    const changeMonth = (far) => {
        setToday(new Date(today.getFullYear(), today.getMonth() + far, 1));
    };

    const checkToday = (day) => {
        let currentDay = new Date();
        currentDay = new Date(
            currentDay.getFullYear(),
            currentDay.getMonth(),
            currentDay.getDate()
        );
        return currentDay.getTime() == day.getTime();
    };

    return (
        <>
            <Container>
                <StyledHeader>
                    <Flip
                        onClick={() => {
                            changeMonth(-1);
                        }}
                    >
                        <ArrowBackIosNewIcon fontSize="small" />
                    </Flip>
                    <StyledMonth>{getMonthString(today.getMonth())}</StyledMonth>
                    <Flip
                        x="true"
                        onClick={() => {
                            changeMonth(1);
                        }}
                    >
                        <ArrowBackIosNewIcon fontSize="small" />
                    </Flip>
                </StyledHeader>
                <StyledDateTime>
                    <Row>
                        {daysOfWeek.map((day, index) => (
                            <StyledDay background="#fff" key={index}>
                                {day}
                            </StyledDay>
                        ))}
                    </Row>
                    <RowContainer>
                        {chunkArray(getFullBoardDays(today), 7).map((chunk, index) => (
                            <Row key={index}>
                                {chunk.map((day) => (
                                    <StyledDay
                                        onClick={() => {
                                            onChange(day);
                                        }}
                                        background={
                                            today.getMonth() == day.getMonth()
                                                ? COLOR.primary02
                                                : COLOR.blue[5]
                                        }
                                        color={
                                            today.getMonth() == day.getMonth()
                                                ? COLOR.primary03
                                                : COLOR.gray[2]
                                        }
                                        cursor={
                                            today.getMonth() == day.getMonth()
                                                ? 'pointer'
                                                : 'not-allowed'
                                        }
                                        key={day.getTime()}
                                        today={checkToday(day)}
                                    >
                                        {day.getDate()}
                                    </StyledDay>
                                ))}
                            </Row>
                        ))}
                    </RowContainer>
                </StyledDateTime>
            </Container>
        </>
    );
};

export default Calendar;
