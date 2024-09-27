import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export interface Option {
  label?:string, value:string
}

interface SchemaDropdownProps{
  options?:(Option | undefined)[]
  selectedSchema:string
  onSelectSchema:(value:string)=>void
}

const SchemaDropdown = ({ options, selectedSchema, onSelectSchema }:SchemaDropdownProps) => {
  return (
     <FormControl fullWidth >
      <Select value={selectedSchema}
      onChange={(e)=>onSelectSchema(e.target.value)}
      sx={{height:'45px !important',margin:'15px 30px 0 20px'}}
     >
        {options?.map(option => (
          <MenuItem key={option?.value} value={option?.value}>
            {option?.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SchemaDropdown;
