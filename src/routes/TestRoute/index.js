import { useState } from 'react';

import { EditorState } from 'draft-js';

import { AdvanceEditor } from '../../components';
import { fromHTML } from '../../utils/draft';

const TEMPLATE2 = `
<h1>Reports agenda</h1>
<p>
Whether you’re meeting in-person or meeting asynchronously, these four agenda items will keep you and your team on top of your sprint.
</p>
<ol>
	<h2>1. Blockers</h2>
    <p>Is there anything preventing contributors from getting work done? Things to bring up here might be technical limitations, departmental and team dependencies, and personal limitations (like vacations booked, people out sick, etc.).</p>
    <h2>2. What you have done?</h2>
    <p>This is a quick rundown of what got done (and if anything didn’t get done, then why). This isn’t the time for each person to run down their whole to-do list – they should focus on the large chunks of work that made up their deep focus time, and the activities that are relevant to your team as a whole.</p>
    <h2>3. What are your goals?</h2>
    <p>Here, each team member will say what they want to accomplish – in other words, what they can be held accountable for in tomorrow’s daily scrum meeting.</p>
    <h2>4. How close are we to hitting our sprint goals? What’s your comfort level?</h2>
    <p>This agenda item will help the scrum master get an idea of how the team is feeling about how their day-to-day activities are impacting overall goals for the team, and how contributors are feeling about the pace of the sprint.</p>
</ol>
`;

const TestRoute = () => {
    const [editorState, setEditorState] = useState(
        EditorState.createWithContent(fromHTML(TEMPLATE2))
    );
    return (
        <AdvanceEditor editorState={editorState} setEditorState={setEditorState}></AdvanceEditor>
    );
};

export default TestRoute;
