import React from 'react';
import MultiSelect from "react-multi-select-component";



export default function Keywords (props) {
    
    const [selected, setSelected] = useState([]);

    const options = () => {
        return (
            props.keywords.map(keyword => ({label: keyword.name, value: keyword.id}))
        )    
    }

    return (
        <div>
            <h1>Select keywords</h1>
            <pre>{JSON.stringify(selected)}</pre>
            <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy={"Select"}
            />
        </div>
    );

}