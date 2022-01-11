import * as React from 'react';
import {Box, Modal} from "@mui/material";
import CardCharacter from "./CardCharacter";
import CloseIcon from '@mui/icons-material/Close';
import ImgForm from "./ImgForm";

const style = {
    position: 'absolute',
    top: '30%',
    left: '40%',
    transform: 'translate(-30%, -30%)',
    width: '30vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,
};

export default function InputModal({open, handleClose, styles, setImg}) {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CloseIcon
                        fontSize='medium'
                        className={styles.modal_close}
                        onClick={handleClose}
                    />
                    <ImgForm
                        setImg={setImg}
                        handleClose={handleClose}
                    />
                </Box>
            </Modal>
        </div>
    );
}