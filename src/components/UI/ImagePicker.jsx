import React, {useState} from 'react'
import {Card, CardMedia, Stack, Typography} from '@mui/material'
import {Button} from './Button'
import {DownloadDone, DriveFolderUpload} from '@mui/icons-material'

function ImagePicker({register, required, error, name, imageFile, defaultValue}) {
    const [selectedImage, setSelectedImage] = useState(null)

    if (imageFile) {
        const file = imageFile[0]
        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setSelectedImage(reader.result)
            }
        }
    }

    return (
        <>
            <Stack direction="row" className="w-[90%] items-center justify-between">
                <input
                    accept="image/jpeg,image/png,image/tiff,image/webp"
                    style={{display: 'none'}}
                    id={name}
                    {...register(name, {...required})}
                    type="file"
                />
                <label htmlFor={name}>
                    <Button
                        variant="contained"
                        component="span"
                        endIcon={
                            selectedImage || defaultValue ? <DownloadDone /> : <DriveFolderUpload />
                        }
                        className="text-black bg-[#ffc404] border-[2px] border-[#ccc] "
                    >
                        {selectedImage || defaultValue ? 'Image Selected' : 'Upload Image'}
                    </Button>
                </label>

                {(selectedImage || defaultValue) && (
                    <Card
                        sx={{maxWidth: 300, maxHeight: 250, mt: 2}}
                        className="border-[1px] border-yellow-400 rounded"
                    >
                        <CardMedia
                            component="img"
                            height="200"
                            image={
                                defaultValue && !selectedImage
                                    ? `http://localhost:3000/${defaultValue}`
                                    : selectedImage
                            }
                            alt="Selected image"
                        />
                    </Card>
                )}
                {error && (
                    <Typography variant="body2" color="error">
                        *{error.message}
                    </Typography>
                )}
            </Stack>
        </>
    )
}

export default ImagePicker
