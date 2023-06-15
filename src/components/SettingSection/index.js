import { useState } from 'react';

import Selection from '../Selection';
import { Col, Input, Label, OptContent, Row, SelectionOuter, Title } from './style';

const SettingSection = ({ values, title, opts }) => {
    const [exact, setExact] = useState(opts[0] || '');
    console.log(opts);
    const semesterSetting = () => {
        return (
            <>
                <Row>
                    <Col>
                        <Label>Semester:</Label>
                    </Col>
                    <Col>
                        <SelectionOuter>
                            <Selection options={opts} onChange={setExact} />
                        </SelectionOuter>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Label>Start date</Label>
                    </Col>
                    <Col>
                        <SelectionOuter>
                            <Input
                                type={'text'}
                                value={
                                    opts.find((item) => item.value === exact.value).value ||
                                    opts[0].startDate
                                }
                                readOnly
                            />
                        </SelectionOuter>
                    </Col>
                </Row>
            </>
        );
    };

    const subjectsSetting = () => {
        return (
            <>
                <Row>
                    <Col>
                        <Label>Subject Name:</Label>
                    </Col>
                    <Col>
                        <SelectionOuter>
                            <Selection options={opts} onChange={setExact} />
                        </SelectionOuter>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Label>Start date</Label>
                    </Col>
                    <Col>
                        <SelectionOuter>
                            <Input
                                type={'text'}
                                value={
                                    opts.find((item) => item.value === exact.value).value ||
                                    values[0].name
                                }
                                readOnly
                            />
                        </SelectionOuter>
                    </Col>
                </Row>
            </>
        );
    };
    return (
        <>
            <Title>{title}</Title>
            <OptContent>{title === 'Semester' ? semesterSetting() : subjectsSetting()}</OptContent>
        </>
    );
};

export default SettingSection;
