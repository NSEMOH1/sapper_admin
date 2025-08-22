import { useNavigate } from 'react-router-dom';
import EmployeesTable from '../../features/employees';
import { Box, Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import { routes } from '../../lib/routes';

const Employees = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className='flex justify-between items-center'>
                <p className='text-2xl font-bold'>Members</p>
                <Popover>
                    <PopoverTrigger>
                        <Button bg='#0089ED' color='white' colorScheme='blue'>Register Member</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            <Box display='flex' flexDirection='column' gap={2}>
                                <Button onClick={() => navigate(routes.members.createCivilian)}>Civilian</Button>
                                <Button onClick={() => navigate(routes.members.createPersonel)}>Personel</Button>
                            </Box>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </div>
            <EmployeesTable />
        </div>
    )
}

export default Employees