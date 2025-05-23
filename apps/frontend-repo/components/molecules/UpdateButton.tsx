'use client'

import { Button, Typography, Box, Alert } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchCurrentUser, updateCurrentUser } from "@/store/thunks/userThunks"
import { clearUpdateStatus } from "@/store/slices/userSlice"

interface UpdateButtonProps {
  actionType?: 'fetch' | 'update'
  userId?: string
  updateData?: {
    name?: string
    isActive?: boolean
  }
}

export default function UpdateButton({
  actionType = 'fetch', userId, updateData
}: UpdateButtonProps) {
  const dispatch = useAppDispatch()
  const {
    currentUser,
    loading,
    error,
    updateLoading,
    updateSuccess,
    updateError
  } = useAppSelector((state) => state.user)

  const handleFetchUser = async() => {
    try {
      await dispatch(fetchCurrentUser(userId)).unwrap()
    }
    catch(err) {
      //
    }
  }

  const handleUpdateUser = async() => {
    if(!updateData) {
      return
    }

    try {
      await dispatch(updateCurrentUser(updateData)).unwrap()

      // clear message after 3s
      setTimeout(() => {
        dispatch(clearUpdateStatus())
      }, 3000)
    }
    catch(err: any) {
      //
    }
  }

  const handleClick = () => {
    if(actionType === 'fetch') {
      handleFetchUser()
    }
    else {
      handleUpdateUser()
    }
  }

  return (
    <Box>
      <Button
        variant="contained"
        color={actionType === 'fetch' ? 'primary' : 'secondary'}
        onClick={handleClick}
        disabled={actionType === 'fetch' ? loading : updateLoading}
        sx={{ mb: 2 }}
      >
        {actionType === 'fetch' 
          ? (loading ? 'Fetching...' : 'Fetch User Data')
          : (updateLoading ? 'Updating...' : 'Update User Data')
        }
      </Button>

      {/* Display status messages */}
      {actionType === 'fetch' && error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          <Typography variant="body2">Error: {error}</Typography>
        </Alert>
      )}

      {actionType === 'fetch' && currentUser && !loading && (
        <Alert severity="success" sx={{ mt: 1 }}>
          <Typography variant="body2">
            User fetched successfully: {currentUser.name} ({currentUser.email})
          </Typography>
        </Alert>
      )}

      {actionType === 'update' && updateError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          <Typography variant="body2">Update Error: {updateError}</Typography>
        </Alert>
      )}

      {actionType === 'update' && updateSuccess && (
        <Alert severity="success" sx={{ mt: 1 }}>
          <Typography variant="body2">User updated successfully!</Typography>
        </Alert>
      )}
    </Box>
  )
}