/* eslint-disable react/prop-types */
import { TurnedInNot } from '@mui/icons-material'
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { startSetActiveNote } from '../../store/journal/thunks'

export const SideBarItem = ({ title, body, id, date, imageUrls = [] }) => {
  const dispatch = useDispatch()

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + '...' : title
  }, [title])

  const handleSetActiveNote = () => {
    dispatch(startSetActiveNote({ title, body, id, date, imageUrls }))
  }

  return (
    <ListItem
      disablePadding
      onClick={handleSetActiveNote}
    >
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
