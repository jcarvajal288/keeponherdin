import {ReactNode} from "react";
import {Box, Modal} from "@mui/material";

export const GenericModal = (props: { children: ReactNode }) => {
    return (
        <Modal
            open={true}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    boxShadow: '0px 9px 46px 8px #0000001F',
                    backgroundColor: 'background.default',
                    borderRadius: '4px',
                    overflowY: 'auto',
                    py: 2,
                    px: 4,
                    maxHeight: '90%'
                }}
            >
                {props.children}
            </Box>
        </Modal>
    )
}