import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView } from '../views'

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam,
        maiores corrupti quae aspernatur voluptatibus ex sed iusto dolorem
        aperiam aliquam atque voluptate quam a consectetur dolores iste officia
        quis doloribus?
      </Typography> */}

      {/* <NothingSelectedView /> */}
      <NoteView />
      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          bottom: 50,
          right: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  )
}
