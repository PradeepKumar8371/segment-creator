import React, { useState } from 'react';
import SchemaDropdown from './SchemaDropdown';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import { Option } from './SchemaDropdown';

interface ModalProps {
    schemaOptions: Option[]
    onSave: (value: any) => void
    onClose: () => void
}

const Modal = ({ schemaOptions, onSave, onClose }: ModalProps) => {
    const classes = useStyles();
    const [segmentName, setSegmentName] = useState<string>('');
    const [selectedSchema, setSelectedSchema] = useState<string>('');
    const [schemaList, setSchemaList] = useState<Option[]>([])

    const handleAddSchema = () => {
        let theSchemaList = [...schemaList]
        if (selectedSchema && !schemaList.some((schema) => schema.value === selectedSchema)) {
            theSchemaList.push({ value: selectedSchema })
            setSchemaList(theSchemaList)
        }
    };

    const handleSaveClick = () => {
        if (segmentName && schemaList?.length) {
            onSave({ segmentName, schemaList });
            setSchemaList([])
            onClose()
        }
    };

    const availableSchemaOptions = schemaOptions.filter(
        (option) => !schemaList.some((schema) => schema.value === option.value)
    );

    const addedDropdownOptions = (schema: Option) => {
        return [...availableSchemaOptions, (schemaOptions.find(item => item.value === schema.value))]
    };


    const filterOption = (schema: Option) => {
        let option = schemaOptions?.find(item => item?.value === schema.value)
        if (option?.value) {
            return option
        } else {
            return { label: '', value: '' }
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <ArrowBackIosIcon sx={{ color: 'white', margin: '20px' }} /><h3>Saving Segment</h3>
            </div>
            <div className={classes.subContainer}>
                <p>Enter The Name Of The Segmeent</p>
                <TextField
                    className={classes.inputField}
                    variant="outlined"
                    placeholder='Name of the segment'
                    onChange={(e) => setSegmentName(e.target.value)}
                />
                <p>To save your segment, you need to add the schemas to build the query</p>
                <div className={classes.schemaList}>
                    {schemaList.map((schema, index) => (
                        <SchemaDropdown
                            options={addedDropdownOptions(schema)}
                            selectedSchema={schema?.value}
                            onSelectSchema={(newSchema) => {
                                let updatedSchemaList = [...schemaList]
                                updatedSchemaList[index].value = newSchema
                                setSchemaList(updatedSchemaList)
                                filterOption(schema)
                            }
                            }
                        />
                    ))}
                </div>
                <SchemaDropdown
                    options={availableSchemaOptions}
                    selectedSchema={selectedSchema}
                    onSelectSchema={(value) => setSelectedSchema(value)}
                />
                <h4 onClick={handleAddSchema}>+ Add new schema</h4>
            </div>
            <div className={classes.buttons}>
                <Button variant="contained" sx={{ backgroundColor: '#41b494', textTransform: 'capitalize' }} onClick={handleSaveClick}>Save the segment</Button>
                <Button variant="text" sx={{ color: 'red', textTransform: 'capitalize', backgroundColor: 'white' }} onClick={onClose}>Cancel</Button>
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '100vh',
        position: 'relative'
    },
    subContainer: {
        '&>p': {
            padding: '15px 0 8px 0'
        },
        padding: '0 20px 20px 20px',
        "&>h4": {
            color: '#41b494',
            marginLeft: '22px',
            cursor: "pointer"
        }
    },
    header: {
        display: "flex",
        alignItems: "center",
        height: "75px",
        backgroundColor: "#39aebc",
        "&>h3": {
            color: 'white'
        }
    },
    inputField: {
        width: '100%',
        '& .MuiInputBase-root': {
            height: 40,
        },
        '& .MuiInputBase-input': {
            padding: '10px 14px',
        },
    },
    schemaList: {
        paddingBottom: '15px',
        border: '2px solid #a0c6e8',
        maxWidth: '500px !important',
        maxHeight: "300px",
        overflowY: "auto"
    },
    buttons: {
        padding: '20px',
        display: 'flex',
        backgroundColor: '#f6f6f6',
        height: '100px',
        alignItems: 'center',
        gap: '20px',
        position: 'absolute',
        bottom: '0',
        width: '100%'
    },

})

export default Modal;
