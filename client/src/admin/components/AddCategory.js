import React from 'react'
import { Button, Form } from 'react-bootstrap'
const AddCategory = ({handleSubmit, setAddcategory, value}) => {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="validationCustom01">
                <Form.Control className='py-3' value={value} onChange={(e) => setAddcategory(e.target.value)} type="text" placeholder="Add category" />
            </Form.Group>
            <div className="text-end">
                <Button className='px-5 bold' onClick={handleSubmit} variant="primary" type="submit"> Submit</Button>
            </div>
        </Form>
    )
}

export default AddCategory
