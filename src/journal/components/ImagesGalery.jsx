/* eslint-disable react/prop-types */
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

export const ImagesGalery = ({ images }) => {
  return (
    <ImageList
      sx={{ width: '100%', height: 500 }}
      cols={4}
      rowHeight={200}
    >
      {images.map((image) => (
        <ImageListItem key={image}>
          console.log(image)
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            loading='lazy'
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
