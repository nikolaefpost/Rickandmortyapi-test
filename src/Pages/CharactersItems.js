import React, {useEffect, useState} from 'react';
import AlignItemsList from "../Components/AlignItemsList";
import styles from './charactersItems.module.css'
import {Box, Button, Modal} from "@mui/material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ComboBox from "../Components/ComboBox";
import PaginationRounded from "../Components/Pagination";
import BasicModal from "../Components/Modal";
import {useHistory} from "react-router-dom";
import {CHARACTERS_ROUTE, FAVORITE_ROUTE, START_ROUTE} from "../Utils/consts";
import InputModal from "../Components/InputModal";


const CharactersItems = () => {

    const [characters, setCharacters] = useState([])
    const [charactersFav, setCharactersFav] = useState(JSON.parse (localStorage.getItem('favorite'))||[])
    const [targetCharacter, setTargetCharacter] = useState({})
    const [pages, setPages] = useState()
    const [paginCount, setPaginCount] = useState(1);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [modalImg, setModalImg] = useState(false)
    const handleOpenImg = () => setModalImg(true);
    const handleCloseImg  = () => setModalImg(false);

    const [img, setImg] = useState('')
    console.log(img)

    let  input_img;
    const enterImg = (e)=> {
        console.log(input_img)
        let fReader = new FileReader();
        fReader.readAsDataURL(input_img.files[0]);
        fReader.onloadend = function(event){
        }

        // setImg(e.target.value)
    }
    const [id, setId] = useState()

    const history = useHistory();
    useEffect(()=>{
        const addImgList = JSON.parse(localStorage.getItem(paginCount))?.map((item)=>{
            return (item.id===id) ? {...item, imageAdd: img}: item
        })

        console.log(addImgList)
        if (addImgList) localStorage.setItem (paginCount, JSON.stringify(addImgList))

    }, [img])

    useEffect(()=>{
        localStorage.setItem ('favorite', JSON.stringify(charactersFav))
    }, [charactersFav])

    useEffect(() => {
        // localStorage.clear()
        const list = JSON.parse (localStorage.getItem(paginCount))
        if(list){
            setCharacters(list)
            if (!pages) setPages(Number(localStorage.getItem('page')))
            setIsLoaded(true);
        }else {
            fetch('https://rickandmortyapi.com/api/character?page=' + paginCount)
                .then(res => res.json())
                .then((result) => {
                        // if(result.info.pages!==pages){
                        //
                        // }
                        setPages(result.info.pages)
                        localStorage.setItem ('page', JSON.stringify(result.info.pages));

                        setCharacters(result.results)
                        setIsLoaded(true);
                        localStorage.setItem (paginCount, JSON.stringify(result.results));
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }, [paginCount])
    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div className={styles.main}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button
                        variant="outlined"
                        color='primary'
                        onClick={()=> history.push(START_ROUTE)}
                    ><ArrowLeftIcon>Filled</ArrowLeftIcon>RETURN TO START</Button>
                    <Button
                        variant="outlined"
                        onClick={()=> history.push(FAVORITE_ROUTE)}
                        fx={{display: 'flex', alignItems: 'center'}}
                    ><Box sx={{marginTop: '4px', marginRight: 1}}>SHOW LIKES </Box> <ThumbUpIcon sx={{color: 'black'}}/></Button>
                </Box>
                <Box sx={{my: 5, fontSize: 36, fontWeight: 'bold'}}>List of Cartoon Characters Rick and Morty</Box>
                <ComboBox
                    list={characters}
                    handleOpen={handleOpen}
                    setTargetCharacter={setTargetCharacter}
                />
                <AlignItemsList
                    list={characters}
                    styles={styles}
                    handleOpen={handleOpen}
                    setTargetCharacter={setTargetCharacter}
                    setCharacters={setCharacters}
                    paginCount={paginCount}
                    setCharactersFav={setCharactersFav}
                    handleOpenImg={handleOpenImg}
                    setId={setId}
                    listStyle = {{columnCount: 2}}
                    sx= {{  my: 5 }}
                    box = {true}
                />
                <PaginationRounded
                    pages={pages}
                    setPaginCount={setPaginCount}
                />
                <BasicModal
                    open={open}
                    handleClose={handleClose}
                    targetCharacter={targetCharacter}
                    styles={styles}
                />
                 <InputModal
                     open={modalImg}
                     handleClose={handleCloseImg}
                     styles={styles}
                     img={img}
                     setImg={setImg}
                 />
            </div>
        );
    }
};

export default CharactersItems;