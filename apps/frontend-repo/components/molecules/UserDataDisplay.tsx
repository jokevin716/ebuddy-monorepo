'use client'

import { 
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { User } from '@/apis/user'

interface UserDataDisplayProps {
  user: User
  title?: string
  compact?: boolean
}

export default function UserDataDisplay({
  user, title = 'User Information', compact = false
}: UserDataDisplayProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  if(compact) {
    return (
      <Card variant="outlined">
        <CardContent sx={{ p: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
            <Typography variant="subtitle1" fontWeight="600">
              {user.name}
            </Typography>
            <Chip 
              label={user.isActive ? 'Active' : 'Inactive'} 
              color={user.isActive ? 'success' : 'default'}
              size="small"
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={isMobile ? 1 : 2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box mb={2}>
              <Typography variant="caption" color="text.secondary" display="block">
                Name
              </Typography>
              <Typography variant="body1" fontWeight="500">
                {user.name}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box mb={2}>
              <Typography variant="caption" color="text.secondary" display="block">
                Email
              </Typography>
              <Typography variant="body1">
                {user.email}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box mb={2}>
              <Typography variant="caption" color="text.secondary" display="block">
                Status
              </Typography>
              <Chip 
                label={user.isActive ? 'Active' : 'Inactive'} 
                color={user.isActive ? 'success' : 'error'}
                size="small"
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box mb={2}>
              <Typography variant="caption" color="text.secondary" display="block">
                Created
              </Typography>
              <Typography variant="body2">
                {formatDate(user.createdAt)}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box mb={2}>
              <Typography variant="caption" color="text.secondary" display="block">
                Last Updated
              </Typography>
              <Typography variant="body2">
                {formatDate(user.updatedAt)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}