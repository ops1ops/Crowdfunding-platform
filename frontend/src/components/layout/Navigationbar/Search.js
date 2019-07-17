import React from 'react';
import {Button, Form, FormControl} from "react-bootstrap";


const Search = () => {
    return (
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success" className="mr-5">Search</Button>
        </Form>
    );
}

export default Search;