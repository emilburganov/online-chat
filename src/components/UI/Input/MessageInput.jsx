import {useRef} from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import {Stack} from '@mui/joy';

const MessageInput = ({textAreaValue, setTextAreaValue, onSubmit}) => {
    const textAreaRef = useRef(null);

    const handleClick = () => {
        if (textAreaValue.trim() !== '') {
            onSubmit();
            setTextAreaValue('');
        }
    };

    return (
        <Box sx={{pt: 3}}>
            <FormControl>
                <Textarea
                    placeholder="Type something here…"
                    aria-label="Message"
                    ref={textAreaRef}
                    onChange={(e) => {
                        setTextAreaValue(e.target.value);
                    }}
                    value={textAreaValue}
                    minRows={2}
                    maxRows={10}
                    endDecorator={
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="flex-end"
                            flexGrow={1}
                            minHeight={40}
                        >
                            <Button onClick={handleClick}>
                                Send
                            </Button>
                        </Stack>
                    }
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
                            handleClick();
                        }
                    }}
                />
            </FormControl>
        </Box>
    );
};

export default MessageInput;